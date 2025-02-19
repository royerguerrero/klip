import { SalesFrontCompanyRegistry } from "@/contexts/sales-front/company/infrastructure/SalesFrontCompanyRegistry";
import { Bootstrap } from "@/contexts/shared/infrastructure/Bootstrap";

const bootstrap = new Bootstrap([new SalesFrontCompanyRegistry()]);

export default bootstrap;
