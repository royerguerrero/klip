export class PhoneNumberAlreadyInUse extends Error {
  constructor(phone: string) {
    super(`The phone number is already in use (${phone})`);
    this.name = "PhoneNuberAlreadyInUse";
  }
}
