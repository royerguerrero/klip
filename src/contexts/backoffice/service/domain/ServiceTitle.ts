import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class ServiceTitle implements ValueObject {
  readonly MAX_LENGTH = 100;
  constructor(readonly value: string) {
    this.ensureIsValidServiceTitle(value);
  }

  ensureIsValidServiceTitle(title: string) {
    if (title.length > this.MAX_LENGTH) {
      throw new Error(
        `The service title is too long(${title}) is too long. Max ${this.MAX_LENGTH} characters`,
      );
    }
  }
}
