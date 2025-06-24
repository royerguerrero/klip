export async function listCustomers() {
}

export async function retrieveCustomer(customerId: string) {
    return {
        firstName: "Juan",
        lastName: "Pérez",
        documentType: "dni",
        documentNumber: "12345678",
        email: "juan.perez@example.com",
        phonePrefix: "+51",
        phone: "999 999 999",
    }
}
