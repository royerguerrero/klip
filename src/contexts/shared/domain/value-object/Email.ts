import { ValueObject } from "./ValueObject";
import { EmailIsNotValid } from "../errors/EmailIsNotValid";

export class Email implements ValueObject {
  constructor(readonly value: string) {
    this.ensureIsValidEmail();
  }

  private ensureIsValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new EmailIsNotValid(this.value);
    }
  }
}
