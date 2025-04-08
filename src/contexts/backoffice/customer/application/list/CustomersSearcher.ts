import { CompanyId } from "@/contexts/backoffice/company/domain/CompanyId";
import { CustomerRepository } from "../../domain/CustomerRepository";

export class CustomersSearcher {
  constructor(private repository: CustomerRepository) {}

  search(companyId: CompanyId) {
    return this.repository.searchAll(companyId);
  }
}
