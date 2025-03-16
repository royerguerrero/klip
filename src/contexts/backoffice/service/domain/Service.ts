import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { ServiceId } from "./ServiceId";
import { ServiceTitle } from "./ServiceTitle";
import { ServiceDescription } from "./ServiceDescription";
import { OnetimePayment } from "./payment/onetime/OnetimePayment";
import { SubscriptionPayment } from "./payment/subscription/SubscriptionPayment";
import { InstallmentsPayment } from "./payment/installments/InstallmentsPayment";
import { ServiceFingerprint } from "./ServiceFingerprint";
import { ServiceCategory } from "./ServiceCategory";

export class Service extends AggregateRoot {
  constructor(
    readonly id: ServiceId,
    readonly fingerprint: ServiceFingerprint,
    readonly category: ServiceCategory,
    readonly title: ServiceTitle,
    readonly description: ServiceDescription,
    readonly duration: number,
    readonly availability: any, // Changed from TimeBlocks[] since TimeBlocks is undefined
    readonly payment:
      | OnetimePayment
      | SubscriptionPayment
      | InstallmentsPayment,
  ) {
    super();
  }

  toPrimitives() {
    return {
      // Added return value
      id: this.id.value,
      fingerprint: this.fingerprint.value,
      category: {},
      title: this.title.value,
      description: this.description.value,
      duration: this.duration,
      availability: this.availability,
      payment: this.payment.toPrimitives(),
    };
  }
}
