export class CustomerIdAlreadyExists extends Error {
  constructor(id: string) {
    super(`Customer with id ${id} already exists`);
    this.name = "CustomerIdAlreadyExists";
  }
}
