import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { QueryBus } from "@/contexts/shared/application/QueryBus";
import { InMemoryQueryBus } from "@/contexts/shared/infrastructure/InMemoryQueryBus";
import { CommandBus } from "../application/CommandBus";
import { InMemoryCommandBus } from "./InMemoryCommandBus";

export class Bootstrap {
  constructor(
    public readonly registries: Registry[],
    public readonly queryBus: QueryBus = new InMemoryQueryBus(),
    public readonly commandBus: CommandBus = new InMemoryCommandBus()
  ) {
    this.registries.forEach((registry) => {
      for (const [query, handler] of registry.queryHandlers.entries()) {
        queryBus.registerHandler(query, handler);
      }
      for (const [command, handler] of registry.commandHandlers.entries()) {
        commandBus.registerHandler(command, handler);
      }
    });
  }
}
