import { CustomerRegistry } from "@/contexts/backoffice/customer/infrastructure/CustomerRegistry";
import { Bootstrap } from "@/contexts/shared/infrastructure/Bootstrap";

const bootstrap = new Bootstrap([new CustomerRegistry()]);

export default bootstrap;
