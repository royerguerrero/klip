import { customersTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/customers";
import { Customer } from "../../../domain/Customer";
import { CustomerRepository } from "../../../domain/CustomerRepository";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { eq, desc } from "drizzle-orm";
import { usersTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/user";

export class DrizzleCustomerRepository extends CustomerRepository {
  async save(customer: Customer) {
    await db.transaction(async (tx) => {
      const user = await db
        .insert(usersTable)
        .values({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber.value,
          companyId: customer.companyId.value,
        })
        .returning({ id: usersTable.id });

      await db.insert(customersTable).values({
        id: customer.id.value,
        userId: user[0].id,
        dateOfBirth: customer.dateOfBirth.value.toISOString(),
      });
    });
  }

  async searchAll(): Promise<Customer[]> {
    const query = await db
      .select()
      .from(customersTable)
      .innerJoin(usersTable, eq(usersTable.id, customersTable.userId))
      .orderBy(desc(customersTable.updatedAt));

    return query.map((row) =>
      Customer.fromPrimitives({
        id: row.customers.id,
        firstName: row.users.firstName,
        lastName: row.users.lastName,
        dateOfBirth: new Date(row.customers.dateOfBirth),
        phoneNumber: row.users.phoneNumber ?? "",
        companyId: row.users.companyId,
        identityDocument: {
          type: "",
          documentNumber: "",
        },
      })
    );
  }
}
