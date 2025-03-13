import { CustomerRegistry } from "@/contexts/backoffice/customer/infrastructure/CustomerRegistry";
import { ServiceRegistry } from "@/contexts/backoffice/service/infrastructure/ServiceRegistry";
import { Bootstrap } from "@/contexts/shared/infrastructure/Bootstrap";

const bootstrap = new Bootstrap([
  new CustomerRegistry(),
  new ServiceRegistry(),
]);

export default bootstrap;
