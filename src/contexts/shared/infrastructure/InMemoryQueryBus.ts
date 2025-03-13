import { Query } from "@/contexts/shared/application/Query";
import { QueryBus } from "@/contexts/shared/application/QueryBus";
import { QueryResponse } from "@/contexts/shared/application/QueryResponse";

export class InMemoryQueryBus extends QueryBus {
  async ask<R extends QueryResponse>(query: Query): Promise<R> {
    try {
      const handler = this.handlers.get(query.constructor);

      if (!handler) {
        throw new Error(
          `No handler registered for query: ${query.constructor.name}`,
        );
      }

      return (await handler.handle(query)) as Promise<R>;
    } catch (error) {
      console.error(error);
      throw new Error(`🙋 Error asking query: ${query}`);
    }
  }
}
