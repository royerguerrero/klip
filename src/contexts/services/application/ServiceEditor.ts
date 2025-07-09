import { ServiceRepository } from "../domain/ServiceRepository";
import { Service } from "../domain/Service";
import { ServiceDoesNotExistError } from "../domain/errors/ServiceDoesNotExistError";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";

export class ServiceEditor {
  constructor(private readonly repository: ServiceRepository) {}

  async edit(
    id: string,
    params: Partial<Omit<ReturnType<Service["toPrimitives"]>, "id">>
  ): Promise<{ error: Error | null; service: Service | null }> {
    try {
      const criteria = new Criteria([new Filter("id", Operator.EQUAL, id)]);
      const existingServices = await this.repository.matching(criteria);

      if (existingServices.length === 0) {
        return { error: new ServiceDoesNotExistError(id), service: null };
      }

      const service = existingServices[0].edit(params);
      await this.repository.save(service);

      return { error: null, service };
    } catch (error) {
      return { error: error as Error, service: null };
    }
  }
} 