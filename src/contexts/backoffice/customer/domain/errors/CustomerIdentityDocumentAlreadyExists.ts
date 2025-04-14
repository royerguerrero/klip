export class CustomerIdentityDocumentAlreadyExists extends Error {
  constructor(identityDocument: string) {
    super(`Customer with identity document ${identityDocument} already exists`);
  }
}
