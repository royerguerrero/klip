export class PhoneNumberIsNotValid extends Error {
  constructor(value: string) {
    super(`The phone number <${value}> is not valid`);
    this.name = "PhoneNumberIsNotValid";
  }
} 