import { Customer } from "../../domain/Customer";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { CustomerId } from "../../domain/CustomerId";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";
import { CustomerDateOfBirth } from "../../domain/CustomerDateOfBirth";
import {
  ColombianIdentityDocument,
  IdentityDocumentType,
} from "../../domain/ColombianIdentityDocument";

export class CustomerRegistrar {
  constructor(public repository: CustomerRepository) {}

  registrar(params: {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    identityDocumentType: string;
    identityDocumentNumber: string;
    phoneNumber: string;
    companyId: string;
  }) {
    const customer = Customer.create(
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
    this.repository.save(customer);
  }
}
