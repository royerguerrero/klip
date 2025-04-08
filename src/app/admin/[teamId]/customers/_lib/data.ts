import bootstrap from "@/app/admin/_lib/bootstrap";
import { auth } from "@/app/auth";
import {
  CustomersResponse,
  CustomerResponseDTO,
} from "@/contexts/backoffice/customer/application/CustomersResponse";
import { ListCustomerQuery } from "@/contexts/backoffice/customer/application/list/ListCustomerQuery";

export async function listCustomers(): Promise<CustomerResponseDTO[] | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const query = new ListCustomerQuery({
    id: session.user.id,
    company: session.user.companyId,
  });
  const response = await bootstrap.queryBus.ask<CustomersResponse>(query);
  return response.customers;
}
