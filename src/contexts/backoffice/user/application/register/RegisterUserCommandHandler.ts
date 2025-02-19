import { CommandHandler } from "@/contexts/shared/application/CommandHandler";
import { RegisterUserCommand } from "./RegisterUserCommand";
import { UserRegistrar } from "./UserRegistrar";
import { UserId } from "../../domain/UserId";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { Password } from "../../domain/Password";
import { Company } from "../../domain/Company";
import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";
import { Team } from "../../domain/Team";
import { TeamId } from "../../domain/TeamId";

export class RegisterUserCommandHandler
  implements CommandHandler<RegisterUserCommand>
{
  constructor(private registrar: UserRegistrar) {}

  async handle(command: RegisterUserCommand): Promise<void> {
    this.registrar.registrar({
      id: new UserId(command.id),
      firstName: command.firstName,
      lastName: command.lastName,
      email: new Email(command.email),
      password: new Password(command.password),
      company: new Company(
        new CompanyId(command.company.id),
        command.company.teams.map(
          (team) => new Team(new TeamId(team.id), team.name)
        )
      ),
    });
  }
}
