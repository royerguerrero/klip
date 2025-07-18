import { ServiceRepository } from "@/contexts/services/domain/ServiceRepository";
import { DrizzleRepository } from "@/contexts/shared/infrastructure/persistence/drizzle/DrizzleRepository";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/persistence/drizzle/DrizzleCriteriaConverter";
import {
  questions,
  services,
} from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/services";
import { Service } from "@/contexts/services/domain/Service";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Currencies } from "@/contexts/shared/domain/value-object/Money";
import { inArray, sql } from "drizzle-orm";
import { QuestionInputType } from "@/contexts/services/domain/Question";

export class DrizzleServiceRepository
  extends DrizzleRepository
  implements ServiceRepository
{
  private dataMapper = {
    id: services.id,
    teamId: services.teamId,
  };
  private criteriaConverter = new DrizzleCriteriaConverter(this.dataMapper);

  private statusToDb: Record<string, "D" | "P" | "A"> = {
    draft: "D",
    published: "P",
    archived: "A",
  };

  private statusFromDb: Record<string, string> = {
    D: "draft",
    P: "published",
    A: "archived",
  };

  async save(service: Service): Promise<void> {
    const primitives = service.toPrimitives();

    const data = {
      ...primitives,
      price: primitives.price.amount.toString(),
      currency: primitives.price.currency,
      sessions: primitives.sessions.amount,
      sessionDuration: primitives.sessions.duration,
      status: this.statusToDb[primitives.status] || "D",
    };

    this.connection.transaction(async (tx) => {
      await tx
        .insert(services)
        .values(data)
        .onConflictDoUpdate({
          target: [services.id],
          set: data,
        });

      await tx
        .delete(questions)
        .where(inArray(questions.serviceId, [primitives.id]));

      await tx.insert(questions).values(
        primitives.questions.map((q) => ({
          ...q,
          serviceId: primitives.id,
        }))
      );
    });
  }

  async matching(criteria: Criteria): Promise<Service[]> {
    const filters = this.criteriaConverter.convert(criteria);
    const query = await this.connection
      .select()
      .from(services)
      .where(sql`${filters}`);

    const questionsQuery = await this.connection
      .select()
      .from(questions)
      .where(
        inArray(
          questions.serviceId,
          query.map((service) => service.id)
        )
      );

    return query.map((service) =>
      Service.fromPrimitives({
        id: service.id,
        name: service.name,
        category: service.category,
        subcategory: service.subcategory || "",
        description: service.description || "",
        sessions: {
          amount: service.sessions,
          duration: service.sessionDuration,
        },
        price: {
          amount: Number(service.price),
          currency: service.currency as Currencies,
        },
        status: this.statusFromDb[service.status] || "draft",
        questions: questionsQuery
          .filter((q) => q.serviceId === service.id)
          .map((q) => ({
            id: q.id,
            label: q.label,
            inputType: q.inputType as QuestionInputType,
            required: q.required,
            order: q.order,
            options: q.options as
              | { label: string; value: string }
              | { max: Date | null; min: Date | null }
              | undefined,
          })),
        teamId: service.teamId || "",
      })
    );
  }
}
