import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { CustomerId } from "./CustomerId";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { CompanyId } from "../../shared/domain/value-object/CompanyId";
import { CustomerDateOfBirth } from "./CustomerDateOfBirth";
import {
  ColombianIdentityDocument,
  IdentityDocumentType,
} from "./ColombianIdentityDocument";
import { Email } from "@/contexts/shared/domain/value-object/Email";

export class Customer extends AggregateRoot {
  constructor(
    readonly id: CustomerId,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: CustomerDateOfBirth,
    readonly identityDocument: ColombianIdentityDocument,
    readonly phoneNumber: PhoneNumber,
    readonly email: Email | null,
    readonly createdAt: Date | null,
    readonly updatedAt: Date | null,
    readonly companyId: CompanyId,
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
    email: Email | null,
    companyId: CompanyId,
  ): Customer {
    return new Customer(
      id,
      firstName,
      lastName,
      dateOfBirth,
      identityDocument,
      phoneNumber,
      email,
      null,
      null,
      companyId,
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth.value,
      identityDocument: {
        type: this.identityDocument.type,
        documentNumber: this.identityDocument.number,
      },
      phoneNumber: {
        prefix: this.phoneNumber.prefix,
        number: this.phoneNumber.number,
      },
      email: this.email?.value,
      createdAt: `${this.createdAt?.toLocaleString()}`,
      updatedAt: `${this.updatedAt?.toLocaleString()}`,
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
      number: string;
    };
    phoneNumber: string;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    companyId: string;
  }) {
    return new Customer(
      new CustomerId(primitives.id),
      primitives.firstName,
      primitives.lastName,
      new CustomerDateOfBirth(primitives.dateOfBirth),
      new ColombianIdentityDocument(
        primitives.identityDocument.type as IdentityDocumentType,
        primitives.identityDocument.number,
      ),
      new PhoneNumber(primitives.phoneNumber),
      primitives.email ? new Email(primitives.email) : null,
      primitives.createdAt,
      primitives.updatedAt,
      new CompanyId(primitives.companyId),
    );
  }
}
