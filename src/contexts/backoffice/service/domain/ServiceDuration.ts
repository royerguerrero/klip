import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class ServiceDuration implements ValueObject {
  private MIN_VALUE = 0;

  constructor(
    readonly unit: "minutes" | "hours",
    readonly value: number,
  ) {
    this.ensureIsValidServiceDuration(value);
  }

  ensureIsValidServiceDuration(value: number) {
    if (value <= this.MIN_VALUE) {
      throw new Error(
        `The service duration may be more than (${this.MIN_VALUE})`,
      );
    }
  }

  convertToMinutes(hours: number) {
    return hours / 3600;
  }
}
