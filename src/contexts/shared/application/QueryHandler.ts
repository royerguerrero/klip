import { Query } from "@/contexts/shared/application/Query";
import { QueryResponse } from "@/contexts/shared/application/QueryResponse";

export abstract class QueryHandler<Q extends Query, R extends QueryResponse> {
  abstract subscribedTo(): Query;
  abstract handle(query: Q): Promise<R>;
}
