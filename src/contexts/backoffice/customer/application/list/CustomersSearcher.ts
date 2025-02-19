import { CustomerRepository } from "../../domain/CustomerRepository";

export class CustomersSearcher {
  constructor(private repository: CustomerRepository) {}

  search() {
    const customers = this.repository.searchAll();
    return customers;
  }
}
