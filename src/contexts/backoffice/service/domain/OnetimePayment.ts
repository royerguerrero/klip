import { Entity } from "@/contexts/shared/domain/Entity";
import { Money } from "@/contexts/shared/domain/value-object/Money";
import { OnetimePaymentId } from "./OnetimePaymentId";

export class OnetimePayment extends Entity {
  constructor(readonly id: OnetimePaymentId, readonly amount: Money) {
    super();
  }

  toPrimitives(): object {
    throw new Error("Method not implemented.");
  }
}
