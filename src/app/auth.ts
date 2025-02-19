import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";
import Credentials from "next-auth/providers/credentials";
import bootstrap from "./auth/_lib/bootstrap";
import { AuthenticateUserQuery } from "@/contexts/backoffice/user/application/authenticate/AuthenticateUserQuery";
import { InvalidCredentialsError } from "@/contexts/backoffice/user/domain/InvalidCredentialsError";

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
        if (credentials.email == "test@mail.com") {
          return {
            name: "Joe Doe",
            email: "test@mail.com",
          };
        }

        try {
          const query = new AuthenticateUserQuery(
            credentials.email as string,
            credentials.password as string
          );
          const response = await bootstrap.queryBus.ask(query);
          console.log(response);
        } catch (error) {
          if (error instanceof InvalidCredentialsError) {
            return null;
          }
        }

        return null;
      },
    }),
  ],
});
