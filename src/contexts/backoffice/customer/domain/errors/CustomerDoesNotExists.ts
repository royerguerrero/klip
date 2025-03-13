export class CustomerDoesNotExits extends Error {
  constructor(customerId: string) {
    super(`Customer does not exists in the specified id: ${customerId}`);
    this.name = "CustomerDoesNotExits";
  }
}
