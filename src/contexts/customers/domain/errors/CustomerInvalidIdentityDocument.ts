export class CustomerInvalidIdentityDocumentError extends Error {
  constructor() {
    super("Invalid identity document");
    this.name = "CustomerInvalidIdentityDocumentError";
  }
}
