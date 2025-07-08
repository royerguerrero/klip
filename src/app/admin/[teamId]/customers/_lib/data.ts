import { DrizzleCustomerRepository } from "@/contexts/customers/infrastructure/persistence/DrizzleCustomerRepository";
import { CustomerSearcher } from "@/contexts/customers/application/CustomerSearcher";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { getCurrentUserSession } from "@/app/admin/(auth)/_lib/data";
import { CustomerFinder } from "@/contexts/customers/application/CustomerFinder";

export async function listCustomers() {
  const currentUser = await getCurrentUserSession({
    redirectIfNotFound: true,
    redirectIfOnboardingNotCompleted: true,
  });

  const customerSearcher = new CustomerSearcher(
    new DrizzleCustomerRepository(db)
  );
  const { customers } = await customerSearcher.search(
    currentUser.organization.currentTeam.id
  );

  return customers?.map((customer) => customer.toPrimitives()) ?? [];
}

export async function retrieveCustomer(customerId: string) {
  const currentUser = await getCurrentUserSession({
    redirectIfNotFound: true,
    redirectIfOnboardingNotCompleted: true,
  });

  const customerFinder = new CustomerFinder(new DrizzleCustomerRepository(db));

  const { customer } = await customerFinder.find(
    currentUser.organization.currentTeam.id,
    customerId
  );

  return customer?.toPrimitives() ?? null;
}
