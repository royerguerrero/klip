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

export async function retrieveService(fingerprint: string) {
  return {
    fingerprint: fingerprint,
    title: "Tecnico en Barberia",
    description:
      "Domina cortes, afeitados y estilos contemporáneos, ofreciendo un servicio de barbería moderno e integral.",
    payment: {},
    features: [
      {
        title: "Clases con profesores expertos durante 6 meses",
        detail:
          "Aprende con los mejores tutores con certificaciones y experiencias",
      },
      {

      }
    ],
  };
}
