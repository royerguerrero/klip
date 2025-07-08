export class CustomerDoesNotExistError extends Error {
  constructor(customerId: string) {
    super(`Customer (${customerId}) does not exist`);
    this.name = "CustomerDoesNotExistError";
  }
}
