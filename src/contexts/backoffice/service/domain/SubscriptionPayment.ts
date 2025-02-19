import { Entity } from "@/contexts/shared/domain/Entity";
import { Money } from "@/contexts/shared/domain/value-object/Money";
import { SubscriptionPaymentId } from "./SubscriptionPaymentId";

export class SubscriptionPayment extends Entity {
  constructor(
    readonly id: SubscriptionPaymentId,
    readonly monthlyAmount: Money,
    readonly anualAmount: Money
  ) {
    super();
  }

  toPrimitives(): object {
    throw new Error("Method not implemented.");
  }
}
