import { Repository } from "@/contexts/shared/domain/Repository";
import { Service } from "./Service";

export abstract class ServiceRepository extends Repository {
  abstract save(customer: Service): void;
  abstract remove(customer: Service): void;
  abstract search(id: string): Promise<Service | null>;
  abstract searchAll(): Promise<Service[]>;
}
