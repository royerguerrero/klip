import { ValueObject } from "./ValueObject";

export class PhoneNumber implements ValueObject {
  // TODO: Implement the country value-object/enum here
  constructor(readonly value: string) {
    this.ensureIsValidPhoneNumber();
  }

  private ensureIsValidPhoneNumber() {
    // Using the format E.164
    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneNumberRegex.test(this.value)) {
      throw new Error(`Invalid phone number: ${this.value}`);
    }
  }
}
