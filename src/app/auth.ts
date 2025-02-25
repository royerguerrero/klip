import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";
import Credentials from "next-auth/providers/credentials";
import bootstrap from "./auth/_lib/bootstrap";
import { AuthenticateUserQuery } from "@/contexts/backoffice/user/application/authenticate/AuthenticateUserQuery";
import { InvalidCredentials } from "@/contexts/backoffice/user/domain/errors/InvalidCredentials";
import { AuthenticateUserQueryResponse } from "@/contexts/backoffice/user/application/authenticate/AuthenticateUserQueryResponse";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        callbackUrl: {},
      },
      authorize: async (credentials) => {
        try {
          const query = new AuthenticateUserQuery(
            credentials.email as string,
            credentials.password as string
          );
          const user =
            await bootstrap.queryBus.ask<AuthenticateUserQueryResponse>(query);
          return { ...user };
        } catch (error) {
          if (error instanceof InvalidCredentials) {
            return null;
          }
        }

        return null;
      },
    }),
  ],
});
