import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { Authenticator } from "../application/authenticate/Authenticator";
import { DrizzleUserRepository } from "./persistence/drizzle/DrizzleUserRepository";
import { AuthenticateUserQuery } from "../application/authenticate/AuthenticateUserQuery";
import { AuthenticateUserQueryHandler } from "../application/authenticate/AuthenticateUserQueryHandler";
import { BcryptPasswordHasher } from "./BcryptPasswordHasher";
import { RegisterUserCommand } from "../application/register/RegisterUserCommand";
import { RegisterUserCommandHandler } from "../application/register/RegisterUserCommandHandler";
import { UserRegistrar } from "../application/register/UserRegistrar";

export class UserRegistry extends Registry {
  queryHandlers = new Map([
    [
      AuthenticateUserQuery,
      new AuthenticateUserQueryHandler(
        new Authenticator(
          new DrizzleUserRepository(),
          new BcryptPasswordHasher()
        )
      ),
    ],
  ]);
  public commandHandlers = new Map([
    [
      RegisterUserCommand,
      new RegisterUserCommandHandler(
        new UserRegistrar(
          new DrizzleUserRepository(),
          new BcryptPasswordHasher()
        )
      ),
    ],
  ]);
}
