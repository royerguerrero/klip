import { Repository } from "@/contexts/shared/domain/Repository";
import { Customer } from "./Customer";

export abstract class CustomerRepository extends Repository {
  abstract save(customer: Customer): void;
  abstract remove(customer: Customer): void;
  abstract search(id: string): Promise<Customer | null>;
  abstract searchAll(): Promise<Customer[]>;
}
