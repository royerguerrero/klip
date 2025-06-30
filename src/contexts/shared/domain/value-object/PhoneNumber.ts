import { ValueObject } from "@/contexts/shared/domain/ValueObject";
import { PhoneNumberIsNotValid } from "@/contexts/shared/domain/errors/PhoneNumberIsNotValid";

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

  equals(phoneNumber: PhoneNumber): boolean {
    return this.value === phoneNumber.value;
  }

  notEquals(phoneNumber: PhoneNumber): boolean {
    return !this.equals(phoneNumber);
  }

  private ensureIsValidPhoneNumber(): void {
    if (!this.isValid()) {
      throw new PhoneNumberIsNotValid(this.value);
    }
  }

  private isValid(): boolean {
    const phoneNumberRegex = /^\+[1-9]{1,3}\s\d{7,14}$/;
    return phoneNumberRegex.test(this.value);
  }
}
