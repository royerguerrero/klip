import { CommandHandler } from "@/contexts/shared/application/CommandHandler";
import { RegisterUserCommand } from "./RegisterUserCommand";
import { UserRegistrar } from "./UserRegistrar";
import { UserId } from "../../domain/UserId";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { Password } from "../../domain/Password";
import { Company } from "../../domain/Company";

export class RegisterUserCommandHandler
  implements CommandHandler<RegisterUserCommand>
{
  constructor(private registrar: UserRegistrar) {}

  subscribedTo() {
    return RegisterUserCommand;
  }

  async handle(command: RegisterUserCommand): Promise<void> {
    this.registrar.registrar({
      id: new UserId(command.id),
      firstName: command.firstName,
      lastName: command.lastName,
      email: new Email(command.email),
      password: new Password(command.password),
      company: Company.fromPrimitives(command.company),
    });
  }
}
