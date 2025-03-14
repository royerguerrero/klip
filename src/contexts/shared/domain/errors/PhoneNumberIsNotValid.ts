export class PhoneNumberIsNotValid extends Error {
  constructor(phone: string) {
    super(`The phone number ${phone} is not valid`);
    this.name = "PhoneNumberIsNotValid";
  }
}
