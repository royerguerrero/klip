import { QueryHandler } from "@/contexts/shared/application/QueryHandler";
import { ListCustomerQuery } from "./ListCustomerQuery";
import { CustomersResponse } from "../CustomersResponse";
import { CustomersSearcher } from "./CustomersSearcher";

export class ListCustomerQueryHandler extends QueryHandler<
  ListCustomerQuery,
  CustomersResponse
> {
  constructor(private searcher: CustomersSearcher) {
    super();
  }

  async handle(): Promise<CustomersResponse> {
    return new CustomersResponse(await this.searcher.search());
  }
}
