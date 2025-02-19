import { Customer } from "../../domain/Customer";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { CustomerId } from "../../domain/CustomerId";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";

export class CustomerRegistrar {
  constructor(public repository: CustomerRepository) {}

  registrar(params: {
    id: string | undefined;
    firstName: string;
    lastName: string;
    dob: string;
    phoneNumber: string;
    companyId: string;
  }) {
    const customer = new Customer(
      params.id ? new CustomerId(params.id) : CustomerId.nextId(),
      params.firstName,
      params.lastName,
      new Date(params.dob),
      new PhoneNumber(params.phoneNumber),
      new CompanyId(params.companyId)
    );
    this.repository.save(customer);
  }
}
