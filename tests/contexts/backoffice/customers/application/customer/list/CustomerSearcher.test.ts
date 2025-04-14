import { describe, it, expect } from "@jest/globals";
import { InMemoryCustomerRepository } from "@/contexts/backoffice/customer/infrastructure/persistence/InMemoryCustomerRepository";
import { CustomerRegistrar } from "@/contexts/backoffice/customer/application/register/CustomerRegistrar";
import { CustomerId } from "@/contexts/backoffice/customer/domain/CustomerId"
import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";
import { CustomersSearcher } from "@/contexts/backoffice/customer/application/list/CustomersSearcher";

describe("CustomerSearcher", () => {
  it("should return empty array when no customers exist", async () => {
    const repository = new InMemoryCustomerRepository();
    const searcher = new CustomersSearcher(repository);
    const companyId = CompanyId.nextId();

    const customers = await searcher.search(companyId);
    expect(customers).toHaveLength(0);
  });

  it("should return all customers for a company", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const searcher = new CustomersSearcher(repository);
    const companyId = CompanyId.nextId();

    // Create 3 customers for the company
    for (let i = 0; i < 3; i++) {
      await registrar.registrar({
        id: CustomerId.nextId().value,
        firstName: `John${i}`,
        lastName: "Doe",
        dob: "1990-01-01",
        identityDocumentType: "CC",
        identityDocumentNumber: `12345${i}`,
        phoneNumber: `+57 32165409${i}7`,
        companyId: companyId.value,
      });
    }

    // Create 2 customers for another company
    const otherCompanyId = CompanyId.nextId();
    for (let i = 0; i < 2; i++) {
      await registrar.registrar({
        id: CustomerId.nextId().value,
        firstName: `Jane${i}`,
        lastName: "Doe",
        dob: "1990-01-01",
        identityDocumentType: "CC",
        identityDocumentNumber: `98765${i}`,
        phoneNumber: `+57 32165408${i}8`,
        companyId: otherCompanyId.value,
      });
    }

    const customers = await searcher.search(companyId);
    expect(customers).toHaveLength(3);
    customers.forEach(customer => {
      expect(customer.companyId.value).toBe(companyId.value);
    });
  });

  it("should return customers ordered by updated date", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const searcher = new CustomersSearcher(repository);
    const companyId = CompanyId.nextId();

    await registrar.registrar({
      id: CustomerId.nextId().value,
      firstName: "John",
      lastName: "Doe",
      dob: "1990-01-01",
      identityDocumentType: "CC",
      identityDocumentNumber: "123450",
      phoneNumber: "+57 3216540987",
      companyId: companyId.value,
    });

    await registrar.registrar({
      id: CustomerId.nextId().value,
      firstName: "Jane",
      lastName: "Doe",
      dob: "1990-01-01",
      identityDocumentType: "CC",
      identityDocumentNumber: "123451",
      phoneNumber: "+57 3216540988",
      companyId: companyId.value,
    });

    const customers = await searcher.search(companyId);
    expect(customers).toHaveLength(2);
    expect(new Date(customers[0].updatedAt!).getTime()).toBeGreaterThanOrEqual(
      new Date(customers[1].updatedAt!).getTime()
    );
  });
});
