import { CompanyId } from "@/contexts/backoffice/company/domain/CompanyId";
import { Customer } from "../../domain/Customer";
import { CustomerId } from "../../domain/CustomerId";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { ColombianIdentityDocument } from "../../domain/ColombianIdentityDocument";

export class InMemoryCustomerRepository extends CustomerRepository {
  private customers: Map<string, Customer> = new Map();

  async save(customer: Customer): Promise<void> {
    this.customers.set(customer.id.value, customer);
  }

  remove(customer: Customer): void {
    this.customers.delete(customer.id.value);
  }

  async search(id: CustomerId): Promise<Customer | null> {
    return this.customers.get(id.value) || null;
  }

  async searchAll(companyId: CompanyId): Promise<Customer[]> {
    return Array.from(this.customers.values()).filter(
      (customer) => customer.companyId.value === companyId.value,
    );
  }

  async existingUser(
    id: CustomerId,
    phoneNumber: PhoneNumber,
    identityDocument: ColombianIdentityDocument,
  ): Promise<{ id: boolean; phoneNumber: boolean; identityDocument: boolean }> {
    const customer = this.customers.get(id.value);

    return {
      id: !!customer,
      phoneNumber: Array.from(this.customers.values()).some(
        (customer) => customer.phoneNumber.value === phoneNumber.value,
      ),
      identityDocument: Array.from(this.customers.values()).some(
        (customer) => `${customer.identityDocument.type} ${customer.identityDocument.number}` === `${identityDocument.type} ${identityDocument.number}`,
      ),
    };
  }
}
