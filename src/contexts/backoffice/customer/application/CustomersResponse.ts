import { Customer } from "../domain/Customer";

export interface CustomerResponseDTO {
  id: string;
  name: string;
  identityDocument: string;
}

export class CustomersResponse {
  public readonly customers: Array<CustomerResponseDTO>;

  constructor(customers: Customer[]) {
    this.customers = customers.map((customer) => {
      const primitives = customer.toPrimitives();
      return {
        id: primitives.id,
        name: `${primitives.firstName} ${primitives.lastName}`,
        identityDocument: primitives.identityDocument,
      };
    });
  }
}
