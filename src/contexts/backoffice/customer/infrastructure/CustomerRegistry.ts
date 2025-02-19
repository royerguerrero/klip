import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { RegisterCustomerCommand } from "../application/register/RegisterCustomerCommand";
import { RegisterCustomerCommandHandler } from "../application/register/RegisterCustomerCommandHandler";
import { CustomerRegistrar } from "../application/register/CustomerRegistrar";
import { DrizzleCustomerRepository } from "./persistence/drizzle/DrizzleCustomerRepository";
import { ListCustomerQuery } from "../application/list/ListCustomerQuery";
import { ListCustomerQueryHandler } from "../application/list/ListCustomerQueryHandler";
import { CustomersSearcher } from "../application/list/CustomersSearcher";

export class CustomerRegistry extends Registry {
  public commandHandlers = new Map([
    [
      RegisterCustomerCommand,
      new RegisterCustomerCommandHandler(
        new CustomerRegistrar(new DrizzleCustomerRepository())
      ),
    ],
  ]);
  public queryHandlers = new Map([
    [
      ListCustomerQuery,
      new ListCustomerQueryHandler(
        new CustomersSearcher(new DrizzleCustomerRepository())
      ),
    ],
  ]);
}
