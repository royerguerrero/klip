import { QueryHandler } from "@/contexts/shared/application/QueryHandler";
import { FindSalesFrontCompanyQuery } from "./FindSalesFrontCompanyQuery";
import { SalesFontCompanyResponse } from "../SalesFrontCompanyResponse";
import { SalesFrontCompanySubdomain } from "../../domain/SalesFrontSubdomain";
import { SalesFrontCompanyFinder } from "./SalesFrontCompanyFinder";

export class FindSalesFrontCompanyQueryHandler
  implements QueryHandler<FindSalesFrontCompanyQuery, SalesFontCompanyResponse>
{
  constructor(readonly finder: SalesFrontCompanyFinder) {}

  subscribedTo() {
    return FindSalesFrontCompanyQuery;
  }

  async handle(
    query: FindSalesFrontCompanyQuery,
  ): Promise<SalesFontCompanyResponse> {
    const company = await this.finder.search({
      subdomain: new SalesFrontCompanySubdomain(query.subdomain),
    });

    return new SalesFontCompanyResponse(company);
  }
}
