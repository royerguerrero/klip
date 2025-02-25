import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class SalesFrontCompanySubdomain implements ValueObject {
  constructor(public value: string) {
    super();
  }
}
