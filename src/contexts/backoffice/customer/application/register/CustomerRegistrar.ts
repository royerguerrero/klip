import { Customer } from "../../domain/Customer";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { CustomerId } from "../../domain/CustomerId";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";
import {
  ColombianIdentityDocument,
  IdentityDocumentType,
} from "../../domain/ColombianIdentityDocument";
import { CustomerDateOfBirth } from "../../domain/CustomerDateOfBirth";
import { PhoneNumberAlreadyInUse } from "@/contexts/shared/domain/errors/PhoneNumberAlreadyInUse";
import { CustomerIdAlreadyExists } from "../../domain/errors/CustomerIdAlreadyExists";
import { CustomerIdentityDocumentAlreadyExists } from "../../domain/errors/CustomerIdentityDocumentAlreadyExists";

export class CustomerRegistrar {
  constructor(public repository: CustomerRepository) {}

  async registrar(params: {
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

    const existingUser = await this.repository.existingUser(
      customer.id,
      customer.phoneNumber,
      customer.identityDocument,
    );

    if (existingUser.id) {
      throw new CustomerIdAlreadyExists(customer.id.value);
    }

    if (existingUser.identityDocument) {
      throw new CustomerIdentityDocumentAlreadyExists(customer.identityDocument.number);
    }

    if (existingUser.phoneNumber) {
      throw new PhoneNumberAlreadyInUse(customer.phoneNumber.value);
    }

    await this.repository.save(customer);
  }
}
