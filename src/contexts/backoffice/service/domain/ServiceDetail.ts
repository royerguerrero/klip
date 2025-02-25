import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class ServiceDetail implements ValueObject {
  readonly MAX_LENGTH = 600;
  constructor(readonly value: string) {
    super();
    this.ensureIsValidServiceDetail(value);
  }

  ensureIsValidServiceDetail(detail: string) {
    if (detail.length > this.MAX_LENGTH) {
      throw new Error(
        `The service detail is too long. Max ${this.MAX_LENGTH} characters`
      );
    }
  }
}
