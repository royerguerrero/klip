import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { ServiceRepository } from "../domain/ServiceRepository";
import { Service } from "../domain/Service";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";

export class ServiceSearcher {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async search(teamId: string): Promise<{
    error: Error | null;
    services: Service[] | null;
  }> {
    const services = await this.serviceRepository.matching(
      new Criteria([new Filter("teamId", Operator.EQUAL, teamId)])
    );
    return { error: null, services };
  }
} 