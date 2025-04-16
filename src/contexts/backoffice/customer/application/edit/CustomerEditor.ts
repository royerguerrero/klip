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
import { CustomerIdAlreadyExists } from "../../domain/errors/CustomerIdAlreadyExists";
import { CustomerIdentityDocumentAlreadyExists } from "../../domain/errors/CustomerIdentityDocumentAlreadyExists";
import { PhoneNumberAlreadyInUse } from "@/contexts/shared/domain/errors/PhoneNumberAlreadyInUse";

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
    const customer = await this.repository.search(new CustomerId(params.id));

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

    const exist = await this.repository.exists(
      newCustomer.id,
      newCustomer.phoneNumber,
      newCustomer.identityDocument,
    );

    if (exist.id && customer.id.notEquals(newCustomer.id)) {
      throw new CustomerIdAlreadyExists(params.id);
    }

    if (exist.identityDocument && customer.identityDocument.notEquals(newCustomer.identityDocument)) {
      throw new CustomerIdentityDocumentAlreadyExists(params.identityDocumentNumber);
    }

    if (exist.phoneNumber && customer.phoneNumber.notEquals(newCustomer.phoneNumber)) {
      throw new PhoneNumberAlreadyInUse(params.phoneNumber);
    }

    await this.repository.remove(customer);
    await this.repository.save(newCustomer);
  }
}
