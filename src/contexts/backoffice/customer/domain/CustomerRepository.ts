import { Repository } from "@/contexts/shared/domain/Repository";
import { Customer } from "./Customer";
import { CustomerId } from "./CustomerId";
import { CompanyId } from "../../company/domain/CompanyId";

export abstract class CustomerRepository extends Repository {
  abstract save(customer: Customer): Promise<void>;
  abstract remove(customer: Customer): void;
  abstract search(id: CustomerId): Promise<Customer | null>;
  abstract searchAll(companyId: CompanyId): Promise<Customer[]>;
}
