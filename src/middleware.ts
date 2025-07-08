import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  return await middlewareAuth(request);
}

export async function middlewareAuth(request: NextRequest) {
  const response = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const { user } = await response.json();

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    request.nextUrl.pathname !== "/admin/login" &&
    request.nextUrl.pathname !== "/admin/signup"
  ) {
    if (user === null) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (request.nextUrl.pathname === "/admin/login" && user) {
    if (
      user.organization === null ||
      user.organization.teams.length === 0 ||
      user.organization.currentTeam === null
    ) {
      return NextResponse.redirect(new URL("/admin/onboarding", request.url));
    } else {
      return NextResponse.redirect(
        new URL(
          `/admin/${user.organization.currentTeam.id}/dashboard`,
          request.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
