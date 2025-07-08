import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { CustomerId } from "./CustomerId";
import { TeamId } from "@/contexts/organizations/domain/TeamId";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { DateBirth } from "@/contexts/customers/domain/DateBirth";
import { IdentityDocument } from "@/contexts/customers/domain/IdentityDocument";
import { CustomerStatus } from "./CustomerStatus";

export class Customer extends AggregateRoot {
  constructor(
    public readonly id: CustomerId,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly document: IdentityDocument,
    public readonly dateBirth: DateBirth,
    public readonly email: Email,
    public readonly phone: PhoneNumber,
    public readonly teamId: TeamId,
    public readonly addedAt?: Date,
    public readonly status: CustomerStatus = new CustomerStatus(
      CustomerStatus.ACTIVE
    )
  ) {
    super();
  }

  static create(
    params: Omit<ReturnType<Customer["toPrimitives"]>, "addedAt" | "status">
  ): Customer {
    return new Customer(
      new CustomerId(params.id),
      params.firstName,
      params.lastName,
      new IdentityDocument(params.document.value, params.document.type),
      new DateBirth(params.dateBirth),
      new Email(params.email),
      new PhoneNumber(`${params.phone.prefix} ${params.phone.number}`),
      new TeamId(params.teamId),
      undefined,
      new CustomerStatus(CustomerStatus.ACTIVE)
    );
  }

  edit(
    params: Partial<
      Omit<ReturnType<Customer["toPrimitives"]>, "id" | "addedAt">
    >
  ): Customer {
    return new Customer(
      this.id,
      params.firstName ?? this.firstName,
      params.lastName ?? this.lastName,
      new IdentityDocument(
        params.document?.value ?? this.document.value,
        params.document?.type ?? this.document.type
      ),
      new DateBirth(params.dateBirth ?? this.dateBirth.value),
      new Email(params.email ?? this.email.value),
      new PhoneNumber(
        params.phone?.prefix
          ? `${params.phone.prefix} ${params.phone.number}`
          : `${this.phone.prefix} ${this.phone.number}`
      ),
      new TeamId(params.teamId ?? this.teamId.value),
      this.addedAt,
      new CustomerStatus(params.status ?? this.status.value)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName,
      lastName: this.lastName,
      document: {
        value: this.document.value,
        type: this.document.type,
      },
      dateBirth: this.dateBirth.value,
      email: this.email.value,
      phone: {
        prefix: this.phone.prefix,
        number: this.phone.number,
      },
      teamId: this.teamId.value,
      addedAt: this.addedAt,
      status: this.status.value,
    };
  }

  static fromPrimitives(
    primitives: ReturnType<Customer["toPrimitives"]>
  ): Customer {
    return new Customer(
      new CustomerId(primitives.id),
      primitives.firstName,
      primitives.lastName,
      new IdentityDocument(primitives.document.value, primitives.document.type),
      new DateBirth(primitives.dateBirth),
      new Email(primitives.email),
      new PhoneNumber(`${primitives.phone.prefix} ${primitives.phone.number}`),
      new TeamId(primitives.teamId),
      primitives.addedAt,
      new CustomerStatus(primitives.status || CustomerStatus.ACTIVE)
    );
  }
}
