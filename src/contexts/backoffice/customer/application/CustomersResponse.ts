import { Customer } from "../domain/Customer";

export interface CustomerResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  identityDocumentType: string;
  identityDocumentNumber: string;
  phoneNumber: string;
  email: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export class CustomersResponse {
  public readonly customers: Array<CustomerResponseDTO>;

  constructor(customers: Customer[]) {
    this.customers = customers.map((customer) => {
      const primitives = customer.toPrimitives();
      return {
        ...primitives,
        identityDocumentType: customer.identityDocument.type,
        identityDocumentNumber: customer.identityDocument.number,
      };
    });
  }
}
