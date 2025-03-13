import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { QueryBus } from "@/contexts/shared/application/QueryBus";
import { InMemoryQueryBus } from "@/contexts/shared/infrastructure/InMemoryQueryBus";
import { CommandBus } from "../application/CommandBus";
import { InMemoryCommandBus } from "./InMemoryCommandBus";

export class Bootstrap {
  constructor(
    public readonly registries: Registry[],
    public readonly queryBus: QueryBus = new InMemoryQueryBus(),
    public readonly commandBus: CommandBus = new InMemoryCommandBus(),
  ) {
    this.registries.forEach((registry) => {
      registry.queryHandlers.forEach((handler) =>
        queryBus.registerHandler(handler.subscribedTo(), handler),
      );
      registry.commandHandlers.forEach((handler) =>
        commandBus.registerHandler(handler.subscribedTo(), handler),
      );
    });
  }
}
