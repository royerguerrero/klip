import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";
import { InvalidCredentials } from "./errors/InvalidCredentials";

export class Password implements ValueObject {
  constructor(readonly value: string) {
    this.ensureIsValidPassword(value);
  }

  ensureIsValidPassword(password: string) {
    const minLength = 8;
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumber = /[0-9]/.test(password);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length < minLength
      // !hasUpperCase ||
      // !hasLowerCase ||
      // !hasNumber ||
      // !hasSpecialChar
    ) {
      throw new InvalidCredentials(
        "Password does meet the password requirements"
      );
    }
  }
}
