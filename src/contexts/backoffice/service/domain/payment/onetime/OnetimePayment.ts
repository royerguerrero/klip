import { Entity } from "@/contexts/shared/domain/Entity";
import { Money } from "@/contexts/shared/domain/value-object/Money";
import { OnetimePaymentId } from "./OnetimePaymentId";

export class OnetimePayment extends Entity {
  constructor(readonly id: OnetimePaymentId, readonly price: Money) {
    super();
  }

  toPrimitives(): object {
    return {
      id: this.id.value,
      price: {
        currency: this.price.currency,
        amount: this.price.amount,
      },
    };
  }
}
