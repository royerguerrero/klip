export async function listCustomers() {
  // TODO: Implement customer listing
  return [];
}

export async function retrieveCustomer(customerId: string) {
  // TODO: Implement customer retrieval using customerId
  console.log('Retrieving customer:', customerId);
  return {
    firstName: "Juan",
    lastName: "Pérez",
    documentType: "dni",
    documentNumber: "12345678",
    email: "juan.perez@example.com",
    phonePrefix: "+51",
    phone: "999 999 999",
  };
}
