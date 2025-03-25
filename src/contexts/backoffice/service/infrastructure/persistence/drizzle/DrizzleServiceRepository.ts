import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { Service } from "../../../domain/Service";
import { ServiceRepository } from "../../../domain/ServiceRepository";
import { servicesTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/services";

export class DrizzleServiceRepository implements ServiceRepository {
  async save(service: Service) {
    console.log(service);
    throw new Error("Method not implemented.");
  }

  async remove(customer: Service) {
    console.log(customer);
    throw new Error("Method not implemented.");
  }

  async search(id: string): Promise<Service | null> {
    console.log(id);
    throw new Error("Method not implemented.");
  }

  async searchAll(): Promise<Service[]> {
    const query = await db.select().from(servicesTable);
    return query.map((service) =>
      Service.fromPrimitives({
        id: service.id,
        fingerprint: service.fingerprint,
        title: service.title,
        description: service.description,
        duration: {
          unit: "minutes",
          value: service.duration,
        },
      }),
    );
  }
}
