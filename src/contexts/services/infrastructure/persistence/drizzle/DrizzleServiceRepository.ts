import { ServiceRepository } from "@/contexts/services/domain/ServiceRepository";
import { DrizzleRepository } from "@/contexts/shared/infrastructure/persistence/drizzle/DrizzleRepository";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/persistence/drizzle/DrizzleCriteriaConverter";
import { services } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/services";
import { Service } from "@/contexts/services/domain/Service";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Currencies } from "@/contexts/shared/domain/value-object/Money";
import { sql } from "drizzle-orm";

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

    await this.connection
      .insert(services)
      .values(data)
      .onConflictDoUpdate({
        target: [services.id],
        set: data,
      });
  }

  async matching(criteria: Criteria): Promise<Service[]> {
    const filters = this.criteriaConverter.convert(criteria);
    const result = await this.connection
      .select()
      .from(services)
      .where(sql`${filters}`);

    return result.map((service) =>
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
        teamId: service.teamId || "",
      })
    );
  }
}
