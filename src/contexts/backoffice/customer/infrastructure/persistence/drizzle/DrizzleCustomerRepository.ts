import {
  customersTable,
  IdentifyDocumentType,
} from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/customers";
import { Customer } from "../../../domain/Customer";
import { CustomerRepository } from "../../../domain/CustomerRepository";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { eq, desc } from "drizzle-orm";
import { usersTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/user";

export class DrizzleCustomerRepository extends CustomerRepository {
  async save(customer: Customer) {
    await db.transaction(async (tx) => {
      const user = await tx
        .insert(usersTable)
        .values({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber.value,
          companyId: customer.companyId.value,
        })
        .returning({ id: usersTable.id });

      await tx.insert(customersTable).values({
        id: customer.id.value,
        userId: user[0].id,
        dateOfBirth: customer.dateOfBirth.value.toISOString(),
        identifyDocumentType: customer.identityDocument
          .type as string as IdentifyDocumentType,
        identifyDocumentNumber: customer.identityDocument.number,
      });
    });
  }

  async remove(customer: Customer) {
    await db.transaction(async (tx) => {
      await tx.delete(usersTable).where(eq(usersTable.id, customer.id.value));
      await tx
        .delete(customersTable)
        .where(eq(customersTable.id, customer.id.value));
    });
  }

  async search(id: string): Promise<Customer | null> {
    const query = await db
      .select()
      .from(customersTable)
      .innerJoin(usersTable, eq(usersTable.id, customersTable.userId))
      .orderBy(desc(customersTable.updatedAt))
      .where(eq(customersTable.id, id));

    if (query.length === 0) {
      return null;
    }

    const { customers: customer, users: user } = query[0];
    return Customer.fromPrimitives({
      id: customer.id,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: new Date(customer.dateOfBirth),
      phoneNumber: user.phoneNumber as string,
      email: user.email,
      companyId: user.companyId,
      identityDocument: {
        type: customer.identifyDocumentType,
        number: customer.identifyDocumentNumber,
      },
      createdAt:
        user.createdAt > customer.updatedAt
          ? user.createdAt
          : customer.updatedAt,
      updatedAt:
        user.updatedAt > customer.updatedAt
          ? user.updatedAt
          : customer.updatedAt,
    });
  }

  async searchAll(): Promise<Customer[]> {
    const query = await db
      .select()
      .from(customersTable)
      .innerJoin(usersTable, eq(usersTable.id, customersTable.userId))
      .orderBy(desc(customersTable.updatedAt));

    return query.map(({ customers: customer, users: user }) =>
      Customer.fromPrimitives({
        id: customer.id,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: new Date(customer.dateOfBirth),
        phoneNumber: user.phoneNumber as string,
        email: user.email,
        companyId: user.companyId,
        identityDocument: {
          type: customer.identifyDocumentType,
          number: customer.identifyDocumentNumber,
        },
        createdAt:
          user.createdAt > customer.updatedAt
            ? user.createdAt
            : customer.updatedAt,
        updatedAt:
          user.updatedAt > customer.updatedAt
            ? user.updatedAt
            : customer.updatedAt,
      }),
    );
  }
}
