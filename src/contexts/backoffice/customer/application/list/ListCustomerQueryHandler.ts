import { QueryHandler } from "@/contexts/shared/application/QueryHandler";
import { ListCustomerQuery } from "./ListCustomerQuery";
import { CustomersResponse } from "../CustomersResponse";
import { CustomersSearcher } from "./CustomersSearcher";
import { CompanyId } from "@/contexts/backoffice/company/domain/CompanyId";

export class ListCustomerQueryHandler
  implements QueryHandler<ListCustomerQuery, CustomersResponse>
{
  constructor(private searcher: CustomersSearcher) {}

  subscribedTo() {
    return ListCustomerQuery;
  }

  async handle(query: ListCustomerQuery): Promise<CustomersResponse> {
    return new CustomersResponse(
      await this.searcher.search(new CompanyId(query.reader.company)),
    );
  }
}
