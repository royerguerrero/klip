import { Customer } from "../domain/Customer";

export interface CustomerResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  identityDocument: {
    type: string;
    documentNumber: string;
  };
  phoneNumber: {
    prefix: string;
    number: string;
  };
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
      };
    });
  }
}
