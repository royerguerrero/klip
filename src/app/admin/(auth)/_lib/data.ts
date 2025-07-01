"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { getUserFromSession } from "./session";
import { redirect } from "next/navigation";

export const getCurrentUser = cache(
  async ({
    redirectIfNotFound = false,
  }: { redirectIfNotFound?: boolean } = {}) => {
    const user = await getUserFromSession(await cookies());
    if (redirectIfNotFound && !user) {
      redirect("/admin/login");
    }

    return user;
  }
);
