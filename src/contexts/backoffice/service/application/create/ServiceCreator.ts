import { ServiceRepository } from "../../domain/ServiceRepository";

export class ServiceCreator {
  constructor(private repository: ServiceRepository) {}

  create() {
    throw new Error("Not implemented");
  }
}
