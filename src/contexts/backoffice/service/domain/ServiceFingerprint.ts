import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class ServiceFingerprint implements ValueObject {
  readonly MAX_LENGTH = 100;

  constructor(readonly value: string) {
    this.ensureIsValidServiceFingerprint();
  }

  ensureIsValidServiceFingerprint() {
    if (this.value) {
      if (this.value.length > this.MAX_LENGTH) {
        throw new Error(
          `Service fingerprint cannot be longer than ${this.MAX_LENGTH} characters`
        );
      }
    }
  }
}
