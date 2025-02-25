import { Entity } from "@/contexts/shared/domain/Entity";
import { Money } from "@/contexts/shared/domain/value-object/Money";
import { SubscriptionPaymentId } from "./SubscriptionPaymentId";

export class SubscriptionPayment extends Entity {
  constructor(
    readonly id: SubscriptionPaymentId,
    readonly monthlyPrice: Money,
    readonly anualPrice: Money
  ) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      monthlyPrice: {
        amount: this.monthlyPrice.amount,
        currency: this.monthlyPrice.currency,
      },
      anualPrice: {
        amount: this.anualPrice.amount,
        currency: this.anualPrice.currency,
      },
    };
  }
}
