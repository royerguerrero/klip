import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { CustomerId } from "./CustomerId";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { CompanyId } from "../../shared/domain/value-object/CompanyId";
import { CustomerDateOfBirth } from "./CustomerDateOfBirth";
import {
  ColombianIdentityDocument,
  IdentityDocumentType,
} from "./ColombianIdentityDocument";

export class Customer extends AggregateRoot {
  constructor(
    readonly id: CustomerId,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: CustomerDateOfBirth,
    readonly identityDocument: ColombianIdentityDocument,
    readonly phoneNumber: PhoneNumber,
    readonly companyId: CompanyId
  ) {
    super();
  }

  static create(
    id: CustomerId,
    firstName: string,
    lastName: string,
    dateOfBirth: CustomerDateOfBirth,
    identityDocument: ColombianIdentityDocument,
    phoneNumber: PhoneNumber,
    companyId: CompanyId
  ): Customer {
    return new Customer(
      id,
      firstName,
      lastName,
      dateOfBirth,
      identityDocument,
      phoneNumber,
      companyId
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth.value.toISOString(),
      identityDocument: this.identityDocument.toString(),
      phoneNumber: this.phoneNumber.value,
      companyId: this.companyId.value,
    };
  }

  static fromPrimitives(primitives: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    identityDocument: {
      type: string;
      documentNumber: string;
    };
    phoneNumber: string;
    companyId: string;
  }) {
    return new Customer(
      new CustomerId(primitives.id),
      primitives.firstName,
      primitives.lastName,
      new CustomerDateOfBirth(primitives.dateOfBirth),
      new ColombianIdentityDocument(
        primitives.identityDocument.type as IdentityDocumentType,
        primitives.identityDocument.documentNumber
      ),
      new PhoneNumber(primitives.phoneNumber),
      new CompanyId(primitives.companyId)
    );
  }
}
