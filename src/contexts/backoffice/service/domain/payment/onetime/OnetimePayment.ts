import { Money } from "@/contexts/shared/domain/value-object/Money";
import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class OnetimePayment implements ValueObject {
  constructor(readonly price: Money) {}
}
