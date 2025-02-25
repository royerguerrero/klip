export class InvalidCredentials extends Error {
  constructor(message: string = `The provided credentials are invalid`) {
    super(message);
    this.name = "InvalidCredentials";
  }
}
