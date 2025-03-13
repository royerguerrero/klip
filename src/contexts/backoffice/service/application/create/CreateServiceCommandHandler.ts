import { CommandHandler } from "@/contexts/shared/application/CommandHandler";
import { CreateServiceCommand } from "./CreateServiceCommand";
import { ServiceCreator } from "./ServiceCreator";

export class ServiceCreateCommandHandler
  implements CommandHandler<CreateServiceCommand>
{
  constructor(private creator: ServiceCreator) {}

  async handle(command: CreateServiceCommand): Promise<void> {
    console.log(command);
    this.creator.create();
  }
}
