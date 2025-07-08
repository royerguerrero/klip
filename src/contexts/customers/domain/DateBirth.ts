import { ValueObject } from "@/contexts/shared/domain/ValueObject";
import { CustomerInvalidDateBirthError } from "./errors/CustomerInvalidDateBirth";

export class DateBirth implements ValueObject {
  constructor(readonly value: Date) {
    this.ensureIsValidDateBirth();
  }

  equals(dateBirth: DateBirth): boolean {
    return this.value.getTime() === dateBirth.value.getTime();
  }

  notEquals(dateBirth: DateBirth): boolean {
    return !this.equals(dateBirth);
  }

  private ensureIsValidDateBirth(): void {
    if (!this.isValid()) {
      throw new CustomerInvalidDateBirthError();
    }
  }

  private isValid(): boolean {
    const now = new Date();
    const age = now.getFullYear() - this.value.getFullYear();
    const monthDiff = now.getMonth() - this.value.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < this.value.getDate())) {
      return age - 1 >= 13;
    }
    
    return age >= 13;
  }
} 