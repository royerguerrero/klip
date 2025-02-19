import { Query } from "@/contexts/shared/application/Query";
import { QueryHandler } from "@/contexts/shared/application/QueryHandler";
import { QueryResponse } from "@/contexts/shared/application/QueryResponse";

export abstract class QueryBus {
  protected handlers = new Map<Query, QueryHandler<Query, QueryResponse>>();

  abstract ask<R extends QueryResponse>(query: Query): Promise<R>;

  registerHandler(
    query: Query,
    handler: QueryHandler<Query, QueryResponse>
  ): void {
    this.handlers.set(query, handler);
  }
}
