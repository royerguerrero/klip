import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { Authenticator } from "../application/authenticate/Authenticator";
import { DrizzleUserRepository } from "./persistence/drizzle/DrizzleUserRepository";
import { AuthenticateUserQueryHandler } from "../application/authenticate/AuthenticateUserQueryHandler";
import { BcryptPasswordHasher } from "./BcryptPasswordHasher";
import { RegisterUserCommandHandler } from "../application/register/RegisterUserCommandHandler";
import { UserRegistrar } from "../application/register/UserRegistrar";
import { CompanyFinder } from "../application/register/CompanyFinder";
import { DrizzleCompanyRepository } from "./persistence/drizzle/DrizzleCompanyRepository";

export class UserRegistry extends Registry {
  public commandHandlers = [
    new RegisterUserCommandHandler(
      new UserRegistrar(
        new DrizzleUserRepository(),
        new CompanyFinder(new DrizzleCompanyRepository()),
        new BcryptPasswordHasher(),
      ),
    ),
  ];

  public queryHandlers = [
    new AuthenticateUserQueryHandler(
      new Authenticator(
        new DrizzleUserRepository(),
        new BcryptPasswordHasher(),
      ),
    ),
  ];
}
