import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import {
  ColombianIdentityDocument,
  IdentityDocumentType,
} from "../../domain/ColombianIdentityDocument";
import { Customer } from "../../domain/Customer";
import { CustomerDateOfBirth } from "../../domain/CustomerDateOfBirth";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { CustomerId } from "../../domain/CustomerId";
import { CompanyId } from "@/contexts/backoffice/company/domain/CompanyId";
import { CustomerDoesNotExits } from "../../domain/errors/CustomerDoesNotExists";

export class CustomerEditor {
  constructor(private repository: CustomerRepository) {}

  async edit(params: {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    identityDocumentType: string;
    identityDocumentNumber: string;
    phoneNumber: string;
    companyId: string;
  }) {
    const customer = await this.repository.search(params.id);

    if (customer === null) {
      throw new CustomerDoesNotExits(params.id);
    }

    const newCustomer = Customer.create(
      new CustomerId(params.id),
      params.firstName,
      params.lastName,
      new CustomerDateOfBirth(new Date(params.dob)),
      new ColombianIdentityDocument(
        params.identityDocumentType as IdentityDocumentType,
        params.identityDocumentNumber,
      ),
      new PhoneNumber(params.phoneNumber),
      null,
      new CompanyId(params.companyId),
    );

    this.repository.remove(customer);
    this.repository.save(newCustomer);
  }
}
