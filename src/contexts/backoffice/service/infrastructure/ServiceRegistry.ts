import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { ServiceCreator } from "../application/create/ServiceCreator";
import { DrizzleServiceRepository } from "./persistence/drizzle/DrizzleServiceRepository";
import { CreateServiceCommand } from "../application/create/CreateServiceCommand";
import { ServiceCreateCommandHandler } from "../application/create/CreateServiceCommandHandler";
import { ListServicesQuery } from "../application/list/ListServicesQuery";
import { ListServicesQueryHandler } from "../application/list/ListServicesQueryHandler";
import { ServiceSearcher } from "../application/list/ServicesSearcher";

export class ServiceRegistry extends Registry {
  public queryHandlers = new Map([
    [
      ListServicesQuery,
      new ListServicesQueryHandler(
        new ServiceSearcher(new DrizzleServiceRepository()),
      ),
    ],
  ]);
  public commandHandlers = new Map([
    [
      CreateServiceCommand,
      new ServiceCreateCommandHandler(
        new ServiceCreator(new DrizzleServiceRepository()),
      ),
    ],
  ]);
}
