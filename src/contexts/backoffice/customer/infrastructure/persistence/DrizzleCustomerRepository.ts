import {
  customersTable,
  IdentifyDocumentType,
} from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/customers";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { eq, desc, or } from "drizzle-orm";
import { usersTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/user";
import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";
import { Customer } from "../../domain/Customer";
import { CustomerRepository } from "../../domain/CustomerRepository";
import { CustomerId } from "../../domain/CustomerId";
import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { ColombianIdentityDocument } from "../../domain/ColombianIdentityDocument";

export class DrizzleCustomerRepository extends CustomerRepository {
  async save(customer: Customer): Promise<void> {
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
      const deletedCustomer = await tx
        .delete(customersTable)
        .where(eq(customersTable.id, customer.id.value)).returning();
      await tx.delete(usersTable).where(eq(usersTable.id, deletedCustomer[0].userId));
    });
  }

  async search(id: CustomerId): Promise<Customer | null> {
    const query = await db
      .select()
      .from(customersTable)
      .innerJoin(usersTable, eq(usersTable.id, customersTable.userId))
      .orderBy(desc(customersTable.updatedAt))
      .where(eq(customersTable.id, id.value));

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

  async searchAll(companyId: CompanyId): Promise<Customer[]> {
    const query = await db
      .select()
      .from(customersTable)
      .innerJoin(usersTable, eq(usersTable.id, customersTable.userId))
      .where(eq(usersTable.companyId, companyId.value))
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
      })
    );
  }

  async exists(
    id: CustomerId,
    phoneNumber: PhoneNumber,
    identityDocument: ColombianIdentityDocument
  ): Promise<{ id: boolean; phoneNumber: boolean; identityDocument: boolean }> {
    const query = await db
      .select()
      .from(customersTable)
      .innerJoin(usersTable, eq(usersTable.id, customersTable.userId))
      .where(
        or(
          eq(customersTable.id, id.value),
          eq(usersTable.phoneNumber, phoneNumber.value),
          eq(customersTable.identifyDocumentType, identityDocument.type as string as IdentifyDocumentType)
        )
      );

    return {
      id: query.some(row => row.customers.id === id.value),
      phoneNumber: query.some(row => row.users.phoneNumber === phoneNumber.value),
      identityDocument: query.some(row =>
        row.customers.identifyDocumentType === identityDocument.type as string as IdentifyDocumentType &&
        row.customers.identifyDocumentNumber === identityDocument.number
      )
    };
  }
}
