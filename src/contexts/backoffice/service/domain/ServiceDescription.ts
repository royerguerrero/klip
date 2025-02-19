import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class ServiceDescription extends ValueObject {
  readonly MAX_LENGTH = 120;
  constructor(readonly value: string) {
    super();
    this.ensureIsValidServiceDescription(value);
  }

  ensureIsValidServiceDescription(description: string) {
    if (description.length > this.MAX_LENGTH) {
      throw new Error(
        `The service description is too long. Max ${this.MAX_LENGTH} characters`
      );
    }
  }
}
