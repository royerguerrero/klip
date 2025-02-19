import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { CustomerId } from "./CustomerId";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { CompanyId } from "../../shared/domain/value-object/CompanyId";

export class Customer extends AggregateRoot {
  constructor(
    readonly id: CustomerId,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: Date,
    readonly phoneNumber: PhoneNumber,
    readonly companyId: CompanyId
  ) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth.toISOString(),
      phoneNumber: this.phoneNumber.value,
      companyId: this.companyId.value,
    };
  }

  static fromPrimitives(primitives: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    companyId: string;
  }) {
    return new Customer(
      new CustomerId(primitives.id),
      primitives.firstName,
      primitives.lastName,
      primitives.dateOfBirth,
      new PhoneNumber(primitives.phoneNumber),
      new CompanyId(primitives.companyId)
    );
  }
}
