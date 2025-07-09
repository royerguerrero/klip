export class ServiceDoesNotExistError extends Error {
  constructor(id: string) {
    super(`Service with id ${id} does not exist`);
    this.name = "ServiceDoesNotExistError";
  }
} 