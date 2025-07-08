import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Customer } from "./Customer";

export abstract class CustomerRepository {
  abstract save(customer: Customer): Promise<void>;
  abstract matching(criteria: Criteria): Promise<Customer[]>;
}
