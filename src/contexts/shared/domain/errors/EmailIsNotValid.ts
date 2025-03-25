export class EmailIsNotValid extends Error {
  constructor(email: string) {
    super(`The email ${email} is not valid`);
    this.name = "EmailIsNotValid";
  }
}
