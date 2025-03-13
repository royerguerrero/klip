import { Service } from "../../../domain/Service";
import { ServiceRepository } from "../../../domain/ServiceRepository";

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
    throw new Error("Method not implemented.");
  }
}
