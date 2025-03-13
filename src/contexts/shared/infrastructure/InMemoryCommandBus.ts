import { Command } from "../application/Command";
import { CommandBus } from "../application/CommandBus";

export class InMemoryCommandBus extends CommandBus {
  async dispatch(command: Command): Promise<void> {
    const handler = this.handlers.get(command.constructor);

    if (!handler) {
      throw new Error(
        `No handler registered for command: ${command.constructor.name}`,
      );
    }

    return await handler.handle(command);
  }
}
