import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { UserId } from "./UserId";
import { Company } from "./Company";

export class User extends AggregateRoot {
  constructor(
    readonly id: UserId,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: Email,
    readonly password: string,
    readonly company: Company
  ) {
    super();
  }

  static fromPrimitives(primitives: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: {
      id: string;
      teams: {
        id: string;
        permissions: string[];
      }[];
    };
  }): User {
    return new User(
      new UserId(primitives.id),
      primitives.firstName,
      primitives.lastName,
      new Email(primitives.email),
      primitives.password,
      Company.fromPrimitives(primitives.company)
    );
  }

  static create(
    id: UserId,
    firstName: string,
    lastName: string,
    email: Email,
    password: string,
    company: Company
  ): User {
    return new User(id, firstName, lastName, email, password, company);
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.value,
      password: this.password,
      company: this.company.toPrimitives(),
    };
  }
}
