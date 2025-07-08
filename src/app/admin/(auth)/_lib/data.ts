"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { getUserFromSession, Session } from "./session";
import { redirect } from "next/navigation";

type SessionWithOnboardingCompleted = Omit<Session, "organization"> & {
  organization: NonNullable<Session["organization"]> & {
    currentTeam: NonNullable<
      NonNullable<Session["organization"]>["currentTeam"]
    >;
  };
};

function _getCurrentUserSession(options: {
  redirectIfNotFound: true;
  redirectIfOnboardingNotCompleted: true;
}): Promise<SessionWithOnboardingCompleted>;
function _getCurrentUserSession(options: {
  redirectIfNotFound: true;
  redirectIfOnboardingNotCompleted?: false;
}): Promise<Session>;
function _getCurrentUserSession(options: {
  redirectIfNotFound?: false;
  redirectIfOnboardingNotCompleted: true;
}): Promise<Session>;
function _getCurrentUserSession(options?: {
  redirectIfNotFound?: false;
  redirectIfOnboardingNotCompleted?: false;
}): Promise<Session | null>;
async function _getCurrentUserSession({
  redirectIfNotFound = false,
  redirectIfOnboardingNotCompleted = false,
} = {}) {
  const user = await getUserFromSession(await cookies());
  if (user === null) {
    if (redirectIfNotFound) redirect("/admin/login");
    return null;
  }

  if (
    user.organization === null ||
    user.organization.teams?.length === 0 ||
    user.organization.currentTeam === null
  ) {
    if (redirectIfOnboardingNotCompleted) redirect("/admin/onboarding");
    return user;
  }

  return user;
}

export const getCurrentUserSession = cache(_getCurrentUserSession);
