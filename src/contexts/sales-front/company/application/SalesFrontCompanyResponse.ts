import { SalesFrontCompany } from "../domain/SalesFrontCompany";

export interface SalesFontCompanyDTO {
  subdomain: string;
  seo: {
    title: string;
    description: string;
  };
  banner: string;
  avatar: string;
  title: string;
  description: string;
  serviceCategories: {
    fingerprint: string;
    title: string;
    services: {
      fingerprint: string;
      title: string;
      description: string;
      subCategory: string;
    }[];
  }[];
}

export class SalesFontCompanyResponse {
  public readonly company: SalesFontCompanyDTO;

  constructor(company: SalesFrontCompany) {
    this.company = company.toPrimitives();
  }
}
