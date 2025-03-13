import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { RegisterCustomerCommandHandler } from "../application/register/RegisterCustomerCommandHandler";
import { CustomerRegistrar } from "../application/register/CustomerRegistrar";
import { DrizzleCustomerRepository } from "./persistence/drizzle/DrizzleCustomerRepository";
import { ListCustomerQueryHandler } from "../application/list/ListCustomerQueryHandler";
import { CustomersSearcher } from "../application/list/CustomersSearcher";
import { EditCustomerCommandHandler } from "../application/edit/EditCustomerCommandHandler";
import { CustomerEditor } from "../application/edit/CustomerEditor";

export class CustomerRegistry extends Registry {
  public commandHandlers = [
    new RegisterCustomerCommandHandler(
      new CustomerRegistrar(new DrizzleCustomerRepository()),
    ),
    new EditCustomerCommandHandler(
      new CustomerEditor(new DrizzleCustomerRepository()),
    ),
  ];

  public queryHandlers = [
    new ListCustomerQueryHandler(
      new CustomersSearcher(new DrizzleCustomerRepository()),
    ),
  ];
}
