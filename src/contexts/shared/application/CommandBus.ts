import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";

export abstract class CommandBus {
  protected handlers = new Map<Command, CommandHandler<Command>>();

  abstract dispatch(command: Command): Promise<void>;

  registerHandler(command: Command, handler: CommandHandler<Command>): void {
    this.handlers.set(command, handler);
  }
}
