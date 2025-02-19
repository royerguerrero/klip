import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login/",
  },
  callbacks: {
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
