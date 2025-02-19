import { SalesFrontCompany } from "../../domain/SalesFrontCompany";
import { SalesFrontCompanyDoesNotExits } from "../../domain/SalesFrontCompanyDoesNotExits";
import { SalesFrontCompanyRepository } from "../../domain/SalesFrontCompanyRepository";
import { SalesFrontCompanySubdomain } from "../../domain/SalesFrontSubdomain";

export class SalesFrontCompanyFinder {
  constructor(private repository: SalesFrontCompanyRepository) {}

  async search(params: {
    subdomain: SalesFrontCompanySubdomain;
  }): Promise<SalesFrontCompany> {
    const company = await this.repository.getBySubdomain(params.subdomain);
    if (!company) {
      throw new SalesFrontCompanyDoesNotExits(params.subdomain.value);
    }

    return company;
  }
}
