import bootstrap from "@/app/admin/_lib/bootstrap";
import {
  CustomersResponse,
  CustomerResponseDTO,
} from "@/contexts/backoffice/customer/application/CustomersResponse";
import { ListCustomerQuery } from "@/contexts/backoffice/customer/application/list/ListCustomerQuery";

export async function listCustomers(): Promise<CustomerResponseDTO[]> {
  const query = new ListCustomerQuery();
  const response = await bootstrap.queryBus.ask<CustomersResponse>(query);
  return response.customers;
}
