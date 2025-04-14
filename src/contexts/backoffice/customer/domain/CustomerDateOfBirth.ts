import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";
import { CustomerDateOfBirthIsInvalid } from "./errors/CustomerDateOfBirthIsInvalid";

export class CustomerDateOfBirth implements ValueObject {
  constructor(readonly value: Date) {
    this.ensureIsValidDateOfBirth();
  }

  private ensureIsValidDateOfBirth(): void {
    if (this.value > new Date()) {
      throw new CustomerDateOfBirthIsInvalid(
        "Customer date cannot be in the future",
      );
    }

    const currentDate = new Date();
    const age = currentDate.getFullYear() - this.value.getFullYear();
    const monthDifference = currentDate.getMonth() - this.value.getMonth();
    const dayDifference = currentDate.getDate() - this.value.getDate();

    if (
      age < 13 ||
      (age === 13 &&
        (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))
    ) {
      throw new CustomerDateOfBirthIsInvalid(
        "Customer date cannot be before 13 years old",
      );
    }
  }
}
