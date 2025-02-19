import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";
import { InvalidCredentialsError } from "./InvalidCredentialsError";

export class Password extends ValueObject {
  constructor(readonly value: string) {
    super();
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
      throw new InvalidCredentialsError(
        "Password does meet the password requirements"
      );
    }
  }
}
