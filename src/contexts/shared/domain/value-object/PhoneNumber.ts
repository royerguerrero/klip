import { ValueObject } from "./ValueObject";

export class PhoneNumber extends ValueObject {
  constructor(readonly value: string) {
    super();
    this.ensureIsValidPhoneNumber();
  }

  private ensureIsValidPhoneNumber() {
    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneNumberRegex.test(this.value)) {
      throw new Error(`Invalid phone number: ${this.value}`);
    }
  }
}
