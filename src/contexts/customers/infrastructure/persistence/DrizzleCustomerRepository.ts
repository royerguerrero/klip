import { CustomerRepository } from "@/contexts/customers/domain/CustomerRepository";
import { Customer } from "@/contexts/customers/domain/Customer";
import { CustomerStatus } from "@/contexts/customers/domain/CustomerStatus";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/persistence/drizzle/DrizzleCriteriaConverter";
import {
  customers,
  NewCustomer,
} from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/customers";
import { eq, sql } from "drizzle-orm";
import { DrizzleRepository } from "@/contexts/shared/infrastructure/persistence/drizzle/DrizzleRepository";

export class DrizzleCustomerRepository
  extends DrizzleRepository
  implements CustomerRepository
{
  private dataMapper = {
    id: customers.id,
    teamId: customers.teamId,
  };
  private criteriaConverter = new DrizzleCriteriaConverter(this.dataMapper);

  async save(customer: Customer): Promise<void> {
    const primitives = customer.toPrimitives();
    const data = {
      ...primitives,
      identityDocument: primitives.document.value,
      identityDocumentType: primitives.document
        .type as NewCustomer["identityDocumentType"],
      dob: primitives.dateBirth.toISOString(),
      phone: `${primitives.phone.prefix} ${primitives.phone.number}`,
    };

    await this.connection
      .insert(customers)
      .values(data)
      .onConflictDoUpdate({
        target: [customers.id],
        set: data,
      });
  }

  async matching(criteria: Criteria): Promise<Customer[]> {
    const filters = this.criteriaConverter.convert(criteria);

    const result = await this.connection
      .select()
      .from(customers)
      .where(sql`${filters}`);

    return result.map((customer) =>
      Customer.fromPrimitives({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        document: {
          value: customer.identityDocument,
          type: customer.identityDocumentType,
        },
        dateBirth: new Date(customer.dob),
        email: customer.email,
        phone: {
          prefix: customer.phone.split(" ")[0] ?? "",
          number: customer.phone.split(" ")[1] ?? "",
        },
        teamId: customer.teamId,
        addedAt: new Date(customer.addedAt),
        status: customer.archived
          ? CustomerStatus.ARCHIVED
          : CustomerStatus.ACTIVE,
      })
    );
  }
}
