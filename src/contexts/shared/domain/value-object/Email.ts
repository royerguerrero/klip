import { EmailIsNotValid } from "./EmailIsNotValid";
import { ValueObject } from "./ValueObject";

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
