import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { CompanyId } from "../../shared/domain/value-object/CompanyId";
import { CustomerId } from "../../customer/domain/CustomerId";

export class Company extends AggregateRoot {
  constructor(readonly id: CompanyId) {
    super();
  }

  static fromPrimitives(primitives: { id: string }): Company {
    return new Company(new CustomerId(primitives.id));
  }

  toPrimitives() {
    return {
      id: this.id.value,
    };
  }
}
