import { Authenticator } from "./Authenticator";
import { Password } from "../../domain/Password"
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { AuthenticateUserQuery } from "./AuthenticateUserQuery";
import { QueryHandler } from "@/contexts/shared/application/QueryHandler";
import { AuthenticateUserQueryResponse } from "./AuthenticateUserQueryResponse";

export class AuthenticateUserQueryHandler
  implements QueryHandler<AuthenticateUserQuery, AuthenticateUserQueryResponse>
{
  constructor(readonly authenticator: Authenticator) {}

  async handle(
    query: AuthenticateUserQuery
  ): Promise<AuthenticateUserQueryResponse> {
    const result = await this.authenticator.authenticate({
      email: new Email(query.email),
      password: new Password(query.password),
    });
    return {
      email: result.email.value,
    };
  }
}
