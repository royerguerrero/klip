import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class SalesFrontCompanySubdomain extends ValueObject {
  constructor(public value: string) {
    super();
  }
}
