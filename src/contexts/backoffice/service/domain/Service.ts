import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { ServiceCategory } from "./ServiceCategory";
import { ServiceDescription } from "./ServiceDescription";
import { ServiceFingerprint } from "./ServiceFingerprint";
import { ServiceId } from "./ServiceId";
import { ServiceTitle } from "./ServiceTitle";
import { ServiceDuration } from "./ServiceDuration";

type paymentTypes = "onetime" | "subscription" | "installments";

export class Service extends AggregateRoot {
  constructor(
    readonly id: ServiceId,
    readonly fingerprint: ServiceFingerprint,
    readonly category: ServiceCategory,
    readonly title: ServiceTitle,
    readonly description: ServiceDescription,
    readonly duration: ServiceDuration,
    // readonly payment: OnetimePayment,
    readonly availability: unknown
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    fingerprint: string;
    title: string;
    description: string;
    duration: {
      unit: "minutes" | "hours";
      value: number;
    };
    // payment: {
    //   type: paymentTypes;
    //   options: {
    //     price: {
    //       currency: "COP" | "USD";
    //       amount: number;
    //     };
    //   };
    // };
  }): Service {
    // let payment: OnetimePayment;
    // if (plainData.payment.type === "onetime") {
    //   payment = new OnetimePayment(
    //     new Money(
    //       plainData.payment.options.price.amount,
    //       plainData.payment.options.price.currency,
    //     ),
    //   );
    // } else {
    //   throw new Error("Fail");
    // }

    return new Service(
      new ServiceId(plainData.id),
      new ServiceFingerprint(plainData.fingerprint),
      new ServiceCategory(),
      new ServiceTitle(plainData.title),
      new ServiceDescription(plainData.description),
      new ServiceDuration(plainData.duration.unit, plainData.duration.value),
      null
    );
  }

  toPrimitives() {
    return {
      // Added return value
      id: this.id.value,
      fingerprint: this.fingerprint.value,
      category: {},
      title: this.title.value,
      description: this.description.value,
      duration: {
        unit: this.duration.unit,
        value: this.duration.value,
      },
      payment: {
        type: "onetime" as paymentTypes,
        options: {},
      },
      availability: this.availability,
    };
  }
}
