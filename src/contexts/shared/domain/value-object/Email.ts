import { ValueObject } from "@/contexts/shared/domain/ValueObject";
import { InvalidEmailError } from "@/contexts/shared/domain/errors/InvalidEmailError";

export class Email implements ValueObject {
  constructor(public readonly value: string) {
    this.ensureIsValidEmail();
  }

  private ensureIsValidEmail(): void {
    if (!this.isValid()) {
      throw new InvalidEmailError("Invalid email");
    }
  }

  private isValid(): boolean {
    // RFC 5322 compliant email regex
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      this.value
    );
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  notEquals(other: Email): boolean {
    return !this.equals(other);
  }
}
