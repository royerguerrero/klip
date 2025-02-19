import { customersTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/customers";
import { Customer } from "../../../domain/Customer";
import { CustomerRepository } from "../../../domain/CustomerRepository";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { desc } from "drizzle-orm";

export class DrizzleCustomerRepository extends CustomerRepository {
  async save(customer: Customer) {
    await db.insert(customersTable).values({
      id: customer.id.value,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth.toISOString(),
      phoneNumber: customer.phoneNumber.value,
      companyId: customer.companyId.value,
    });
  }

  async searchAll(): Promise<Customer[]> {
    const query = await db
      .select()
      .from(customersTable)
      .orderBy(desc(customersTable.updatedAt));

    return query.map((row) =>
      Customer.fromPrimitives({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        dateOfBirth: new Date(row.dateOfBirth),
        phoneNumber: row.phoneNumber,
        companyId: row.companyId,
      })
    );
  }
}
