import { ServiceRepository } from "../../domain/ServiceRepository";

export class ServiceSearcher {
  constructor(private repository: ServiceRepository) {}

  search() {
    return this.repository.searchAll();
  }
}
