"server only";

import { FindSalesFrontCompanyQuery } from "@/contexts/sales-front/company/application/finder/FindSalesFrontCompanyQuery";
import {
  SalesFontCompanyDTO,
  SalesFontCompanyResponse,
} from "@/contexts/sales-front/company/application/SalesFrontCompanyResponse";
import { SalesFrontCompanyDoesNotExits } from "@/contexts/sales-front/company/domain/SalesFrontCompanyDoesNotExits";
import bootstrap from "./bootstrap";

export async function retrieveCompany(
  subdomain: string
): Promise<SalesFontCompanyDTO | null> {
  const query = new FindSalesFrontCompanyQuery(subdomain);
  try {
    const response = await bootstrap.queryBus.ask<SalesFontCompanyResponse>(
      query
    );
    return response.company;
  } catch (error) {
    if (error instanceof SalesFrontCompanyDoesNotExits) {
      return null;
    }
    throw error;
  }
}
