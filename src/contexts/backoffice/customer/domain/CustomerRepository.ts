import { Repository } from "@/contexts/shared/domain/Repository";
import { Customer } from "./Customer";
import { CustomerId } from "./CustomerId";
import { CompanyId } from "../../company/domain/CompanyId";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { ColombianIdentityDocument } from "./ColombianIdentityDocument";

export abstract class CustomerRepository extends Repository {
  abstract save(customer: Customer): Promise<void>;
  abstract remove(customer: Customer): void;
  abstract search(id: CustomerId): Promise<Customer | null>;
  abstract searchAll(companyId: CompanyId): Promise<Customer[]>;
  abstract existingUser(
    id: CustomerId,
    phoneNumber: PhoneNumber,
    identityDocument: ColombianIdentityDocument,
  ): Promise<{ id: boolean; phoneNumber: boolean, identityDocument: boolean }>;
}
