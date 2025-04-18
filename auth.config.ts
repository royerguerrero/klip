import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login/",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.companyId = token.companyId as string;
      session.user.teams = token.teams as {
        id: string;
        name: string;
      }[];

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname.includes("/admin")) {
        const isAuthenticated = !!auth?.user;
        return true ? isAuthenticated : false;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
