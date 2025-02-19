import { UserRegistry } from "@/contexts/backoffice/user/infrastructure/UserRegistry";
import { Bootstrap } from "@/contexts/shared/infrastructure/Bootstrap";

const bootstrap = new Bootstrap([new UserRegistry()]);

export default bootstrap;
