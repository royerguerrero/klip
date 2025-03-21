import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { ServiceId } from "./ServiceId";
import { ServiceTitle } from "./ServiceTitle";
import { ServiceDescription } from "./ServiceDescription";
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
    readonly payment: unknown,
    readonly availability: unknown, // Changed from TimeBlocks[] since TimeBlocks is undefined
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    fingerprint: string;
    title: string;
    description: string;
  }): Service {
    return new Service(
      new ServiceId(plainData.id),
      new ServiceFingerprint(plainData.fingerprint),
      new ServiceCategory(),
      new ServiceTitle(plainData.title),
      new ServiceDescription(plainData.description),
      10,
      undefined,
      undefined,
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
      duration: this.duration,
      availability: this.availability,
      payment: this.payment,
    };
  }
}
