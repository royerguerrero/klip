import { Customer } from "./Customer";

export abstract class CustomerRepository {
  abstract save(customer: Customer): void;
  abstract searchAll(): Promise<Customer[]>;
}
