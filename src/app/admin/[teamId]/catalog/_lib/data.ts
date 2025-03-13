import bootstrap from "@/app/admin/_lib/bootstrap";
import { ListServicesQuery } from "@/contexts/backoffice/service/application/list/ListServicesQuery";
import { ServicesResponse } from "@/contexts/backoffice/service/application/ServiceResponse";

export async function listServices() {
  const query = new ListServicesQuery();
  const response = await bootstrap.queryBus.ask<ServicesResponse>(query);

  return response.services;
}
