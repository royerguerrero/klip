import { QueryHandler } from "@/contexts/shared/application/QueryHandler";
import { ServicesResponse } from "../ServiceResponse";
import { ServiceSearcher } from "./ServicesSearcher";
import { ListServicesQuery } from "./ListServicesQuery";

export class ListServicesQueryHandler
  implements QueryHandler<ListServicesQuery, ServicesResponse>
{
  constructor(private searcher: ServiceSearcher) {}

  subscribedTo() {
    return ListServicesQuery;
  }

  async handle(query: ListServicesQuery): Promise<ServicesResponse> {
    console.log(query);
    return new ServicesResponse(await this.searcher.search());
  }
}
