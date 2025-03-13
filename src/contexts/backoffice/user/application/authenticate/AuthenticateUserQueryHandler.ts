import { Authenticator } from "./Authenticator";
import { Password } from "../../domain/Password";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { AuthenticateUserQuery } from "./AuthenticateUserQuery";
import { QueryHandler } from "@/contexts/shared/application/QueryHandler";
import { AuthenticateUserQueryResponse } from "./AuthenticateUserQueryResponse";

export class AuthenticateUserQueryHandler
  implements QueryHandler<AuthenticateUserQuery, AuthenticateUserQueryResponse>
{
  constructor(readonly authenticator: Authenticator) {}

  subscribedTo() {
    return AuthenticateUserQuery;
  }

  async handle(
    query: AuthenticateUserQuery,
  ): Promise<AuthenticateUserQueryResponse> {
    const result = await this.authenticator.authenticate({
      email: new Email(query.email),
      password: new Password(query.password),
    });

    return {
      id: result.id.value,
      email: result.email.value,
      companyId: result.company.id.value,
      teams: result.company.teams.map((team) => ({
        id: team.id.value,
        name: "TODO: Get the name",
      })),
    };
  }
}
