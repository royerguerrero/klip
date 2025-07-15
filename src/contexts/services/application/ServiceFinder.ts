import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";
import { ServiceRepository } from "../domain/ServiceRepository";
import { ServiceDoesNotExistError } from "../domain/errors/ServiceDoesNotExistError";

export class ServiceFinder {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async find(teamId: string, serviceId: string) {
    const services = await this.serviceRepository.matching(
      new Criteria([
        new Filter("id", Operator.EQUAL, serviceId),
        // new Filter("teamId", Operator.EQUAL, teamId),
      ])
    );

    if (services.length === 0) {
      return {
        error: new ServiceDoesNotExistError(serviceId),
        service: null,
      };
    }
    return { error: null, service: services?.[0] ?? null };
  }
} 