export async function addCustomer(customer: Record<string, unknown>) {
  // TODO: Implement customer creation
  console.log('Adding customer:', customer);
}

export async function editCustomer(customerId: string, customer: Record<string, unknown>) {
  // TODO: Implement customer editing
  console.log('Editing customer:', customerId, customer);
}

export async function archiveCustomer(customerId: string) {
  // TODO: Implement customer archiving
  console.log('Archiving customer:', customerId);
}