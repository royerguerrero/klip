import { PhoneNumberIsNotValid } from "../errors/PhoneNumberIsNotValid";
import { ValueObject } from "./ValueObject";

export class PhoneNumber implements ValueObject {
  // Using the format E.164
  constructor(readonly value: string) {
    this.ensureIsValidPhoneNumber();
  }

  get prefix(): string {
    return this.value.split(" ")[0];
  }

  get number(): string {
    return this.value.split(" ")[1];
  }

  private ensureIsValidPhoneNumber() {
    const phoneNumberRegex = /^\+[1-9]{1,3}\s\d{1,14}$/;
    if (!phoneNumberRegex.test(this.value)) {
      throw new PhoneNumberIsNotValid(this.value);
    }
  }
}
