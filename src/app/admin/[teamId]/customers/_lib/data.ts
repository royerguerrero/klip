import { Customer } from "./types";

export async function listCustomers(): Promise<Customer[]> {
  return [
    {
      id: "1",
      firstName: "Juan",
      lastName: "Pérez",
      document: {
        type: "CC",
        number: "12345678",
      },
      email: "juan.perez@example.com",
      phone: {
        prefix: "+51",
        number: "999 999 999",
      },
    },
    {
      id: "2",
      firstName: "Pedro",
      lastName: "García",
      document: {
        type: "CC",
        number: "12345678",
      },
      email: "juan.perez@example.com",
      phone: {
        prefix: "+51",
        number: "999 999 999",
      },
    },
    {
      id: "3",
      firstName: "María",
      lastName: "López",
      document: {
        type: "CC",
        number: "12345678",
      },
      email: "juan.perez@example.com",
      phone: {
        prefix: "+51",
        number: "999 999 999",
      },
    },
  ];
}

export async function retrieveCustomer(
  customerId: string
): Promise<Customer | null> {
  const customers = await listCustomers();
  return customers.find((customer) => customer.id === customerId) ?? null;
}
