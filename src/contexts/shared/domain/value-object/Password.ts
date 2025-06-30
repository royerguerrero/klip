import { ValueObject } from "@/contexts/shared/domain/ValueObject";
import { InvalidPasswordError } from "@/contexts/shared/domain/errors/InvalidPasswordError";

export class Password implements ValueObject {
  constructor(public readonly value: string) {
    if (!this.isValid()) {
      throw new InvalidPasswordError("Invalid password");
    }
  }

  private isValid(): boolean {
    if (this.value.length < 8) {
      throw new InvalidPasswordError("Password must be at least 8 characters long");
    }
    
    return true;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }

  notEquals(other: Password): boolean {
    return !this.equals(other);
  }
}
