import { ServiceRepository } from "../../domain/ServiceRepository";

export class ServiceSearcher {
  constructor(private repository: ServiceRepository) {}

  async search() {
    return await this.repository.searchAll();
  }
}
