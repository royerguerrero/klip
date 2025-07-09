import { ServiceRepository } from "../domain/ServiceRepository";
import { Service } from "../domain/Service";

export class ServiceCreator {
  constructor(private readonly repository: ServiceRepository) {}

  async create(
    params: Omit<ReturnType<Service["toPrimitives"]>, "status">
  ): Promise<{ error: Error | null; service: Service | null }> {
    try {
      const service = Service.create(params);
      await this.repository.save(service);

      return { error: null, service };
    } catch (error) {
      return { error: error as Error, service: null };
    }
  }
}
