import { Entity } from "@/contexts/shared/domain/Entity";
import { InstallmentsPaymentId } from "./InstallmentsPaymentId";
import { Money } from "@/contexts/shared/domain/value-object/Money";

export class InstallmentsPayment extends Entity {
  constructor(
    readonly id: InstallmentsPaymentId,
    readonly totalPrice: Money,
    readonly installments: number,
  ) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      totalPrice: {
        currency: this.totalPrice.currency,
        amount: this.totalPrice.amount,
      },
    };
  }
}
