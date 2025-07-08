export class CustomerInvalidDateBirthError extends Error {
  constructor() {
    super("Invalid date of birth");
    this.name = "CustomerInvalidDateBirthError";
  }
}
