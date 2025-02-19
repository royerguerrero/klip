import { Query } from "@/contexts/shared/application/Query";

export class AuthenticateUserQuery implements Query {
  constructor(readonly email: string, readonly password: string) {}
}
