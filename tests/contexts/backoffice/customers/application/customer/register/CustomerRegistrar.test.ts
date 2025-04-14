import { describe, it, expect } from "@jest/globals";
import { CustomerRegistrar } from "@/contexts/backoffice/customer/application/register/CustomerRegistrar";
import { InMemoryCustomerRepository } from "@/contexts/backoffice/customer/infrastructure/persistence/InMemoryCustomerRepository";
import { CustomerId } from "@/contexts/backoffice/customer/domain/CustomerId";
import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";
import { Customer } from "@/contexts/backoffice/customer/domain/Customer";
import { PhoneNumberIsNotValid } from "@/contexts/shared/domain/errors/PhoneNumberIsNotValid";
import { PhoneNumberAlreadyInUse } from "@/contexts/shared/domain/errors/PhoneNumberAlreadyInUse";
import { CustomerDateOfBirthIsInvalid } from "@/contexts/backoffice/customer/domain/errors/CustomerDateOfBirthIsInvalid";
import { CustomerIdentityDocumentAlreadyExists } from "@/contexts/backoffice/customer/domain/errors/CustomerIdentityDocumentAlreadyExists";
import { CustomerIdAlreadyExists } from "@/contexts/backoffice/customer/domain/errors/CustomerIdAlreadyExists";

describe("CustomerRegistrar", () => {
  it("should create a valid customer", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const customerId = CustomerId.nextId();

    await registrar.registrar({
      id: customerId.value,
      firstName: "Jon",
      lastName: "Doe",
      dob: "1990-01-01",
      identityDocumentType: "CC",
      identityDocumentNumber: "1234567890",
      phoneNumber: "+57 3216540987",
      companyId: CompanyId.nextId().value,
    });

    const customer = await repository.search(customerId);
    expect(customer).toBeInstanceOf(Customer);
    expect(customer).not.toBeNull();
  });

  it("should not create a customer with an invalid phone number", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const customerId = CustomerId.nextId();

    await expect(
      registrar.registrar({
        id: customerId.value,
        firstName: "Jane",
        lastName: "Doe",
        dob: "1990-01-01",
        identityDocumentType: "CC",
        identityDocumentNumber: "0987654321",
        phoneNumber: "invalid_phone_number",
        companyId: CompanyId.nextId().value,
      }),
    ).rejects.toThrow(PhoneNumberIsNotValid);
  });

  it("should not create a customer with a phone number already in use", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const customerId1 = CustomerId.nextId();
    const customerId2 = CustomerId.nextId();

    await registrar.registrar({
      id: customerId1.value,
      firstName: "John",
      lastName: "Doe",
      dob: "1990-01-01",
      identityDocumentType: "CC",
      identityDocumentNumber: "1234567890",
      phoneNumber: "+57 3216540987",
      companyId: CompanyId.nextId().value,
    });

    await expect(
      registrar.registrar({
        id: customerId2.value,
        firstName: "Jane",
        lastName: "Doe",
        dob: "1990-01-01",
        identityDocumentType: "CC",
        identityDocumentNumber: "0987654321",
        phoneNumber: "+57 3216540987",
        companyId: CompanyId.nextId().value,
      }),
    ).rejects.toThrow(PhoneNumberAlreadyInUse);
  });

  it("should not create a customer with a dob in the future", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const customerId = CustomerId.nextId();
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    await expect(
      registrar.registrar({
        id: customerId.value,
        firstName: "Future",
        lastName: "Doe",
        dob: futureDate.toISOString().split("T")[0],
        identityDocumentType: "CC",
        identityDocumentNumber: "1234567890",
        phoneNumber: "+57 3216540987",
        companyId: CompanyId.nextId().value,
      }),
    ).rejects.toThrow(
      new CustomerDateOfBirthIsInvalid("Customer date cannot be in the future"),
    );
  });

  it("should not create a customer under 13 yrs old", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const customerId = CustomerId.nextId();
    const currentDate = new Date();
    const dob = new Date();
    dob.setFullYear(currentDate.getFullYear() - 12);

    await expect(
      registrar.registrar({
        id: customerId.value,
        firstName: "Young",
        lastName: "Doe",
        dob: dob.toISOString().split("T")[0],
        identityDocumentType: "CC",
        identityDocumentNumber: "1234567890",
        phoneNumber: "+57 3216540987",
        companyId: CompanyId.nextId().value,
      }),
    ).rejects.toThrow(
      new CustomerDateOfBirthIsInvalid(
        "Customer date cannot be before 13 years old",
      ),
    );
  });

  it("should not create a customer with an identity document number already in use", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const customerId1 = CustomerId.nextId();
    const customerId2 = CustomerId.nextId();

    await registrar.registrar({
      id: customerId1.value,
      firstName: "John",
      lastName: "Doe",
      dob: "1990-01-01",
      identityDocumentType: "CC",
      identityDocumentNumber: "1234567890",
      phoneNumber: "+57 3216540987",
      companyId: CompanyId.nextId().value,
    });

    await expect(
      registrar.registrar({
        id: customerId2.value,
        firstName: "Jane",
        lastName: "Doe",
        dob: "1990-01-01",
        identityDocumentType: "CC",
        identityDocumentNumber: "1234567890",
        phoneNumber: "+57 3216540988",
        companyId: CompanyId.nextId().value,
      }),
    ).rejects.toThrow(CustomerIdentityDocumentAlreadyExists);
  });

  it("should not create a customer with an id already in use", async () => {
    const repository = new InMemoryCustomerRepository();
    const registrar = new CustomerRegistrar(repository);
    const customerId = CustomerId.nextId();

    await registrar.registrar({
      id: customerId.value,
      firstName: "John",
      lastName: "Doe",
      dob: "1990-01-01",
      identityDocumentType: "CC",
      identityDocumentNumber: "1234567890",
      phoneNumber: "+57 3216540987",
      companyId: CompanyId.nextId().value,
    });

    await expect(
      registrar.registrar({
        id: customerId.value,
        firstName: "Jane",
        lastName: "Doe",
        dob: "1990-01-01",
        identityDocumentType: "CC",
        identityDocumentNumber: "0987654321",
        phoneNumber: "+57 3216540988",
        companyId: CompanyId.nextId().value,
      }),
    ).rejects.toThrow(CustomerIdAlreadyExists);
  });
});
