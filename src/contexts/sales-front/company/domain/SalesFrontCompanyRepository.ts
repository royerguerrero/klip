import { SalesFrontCompany } from "./SalesFrontCompany";
import { SalesFrontCompanySubdomain } from "./SalesFrontSubdomain";

export abstract class SalesFrontCompanyRepository {
  abstract getBySubdomain(
    subdomain: SalesFrontCompanySubdomain
  ): Promise<SalesFrontCompany | null>;
}
