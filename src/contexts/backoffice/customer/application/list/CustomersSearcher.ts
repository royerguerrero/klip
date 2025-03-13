import { CustomerRepository } from "../../domain/CustomerRepository";

export class CustomersSearcher {
  constructor(private repository: CustomerRepository) {}

  search() {
    return this.repository.searchAll();
  }
}
