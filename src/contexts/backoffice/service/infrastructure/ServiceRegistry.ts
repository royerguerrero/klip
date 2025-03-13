import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { ServiceCreator } from "../application/create/ServiceCreator";
import { DrizzleServiceRepository } from "./persistence/drizzle/DrizzleServiceRepository";
import { ServiceCreateCommandHandler } from "../application/create/CreateServiceCommandHandler";
import { ListServicesQueryHandler } from "../application/list/ListServicesQueryHandler";
import { ServiceSearcher } from "../application/list/ServicesSearcher";

export class ServiceRegistry extends Registry {
  public queryHandlers = [
    new ListServicesQueryHandler(
      new ServiceSearcher(new DrizzleServiceRepository()),
    ),
  ];

  public commandHandlers = [
    new ServiceCreateCommandHandler(
      new ServiceCreator(new DrizzleServiceRepository()),
    ),
  ];
}
