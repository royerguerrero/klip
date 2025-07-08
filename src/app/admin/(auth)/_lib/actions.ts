"use server";

import { z } from "zod";

import {
  loginSchema,
  signupSchema,
} from "@/app/admin/(auth)/_components/forms/schemas";
import { redirect } from "next/navigation";
import { UserRegister } from "@/contexts/users/application/UserRegister";
import { DrizzleUserRepository } from "@/contexts/users/infrastructure/persistence/DrizzleUserRepository";
import { CryptoPasswordHasher } from "@/contexts/shared/infrastructure/CryptoPasswordHasher";
import { UserId } from "@/contexts/users/domain/UserId";
import { createUserSession, removeUserFromSession } from "./session";
import { cookies } from "next/headers";
import { UserAuthenticator } from "@/contexts/users/application/UserAuthenticator";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { countries } from "@/app/admin/_lib/countries";

export async function login(unsafeData: z.infer<typeof loginSchema>) {
  const { success, data } = loginSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to log you in");

  const authenticator = await new UserAuthenticator(
    new DrizzleUserRepository(db),
    new CryptoPasswordHasher()
  );
  const { error, user } = await authenticator.authenticate(
    data.email,
    data.password
  );

  if (error || !user) return error as Error;

  // Check if user has an organization with teams
  if (user.organization && user.organization.teams.length > 0) {
    // User has completed onboarding, create full session
    const firstTeam = user.organization.teams[0];
    const country = countries.get(user.organization.country);
    
    if (!country) {
      return new Error("Invalid country code");
    }

    await createUserSession(
      {
        user: {
          id: user.id.value,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        organization: {
          id: user.organization.id.value,
          name: user.organization.name,
          logo: user.organization.logo,
          country: country,
          teams: user.organization.teams.map(team => ({
            id: team.id.value,
            name: team.name,
          })),
          currentTeam: {
            id: firstTeam.id.value,
            name: firstTeam.name,
          },
        },
      },
      await cookies()
    );

    // Redirect to dashboard since user has completed onboarding
    redirect(`/admin/${firstTeam.id.value}/dashboard`);
  } else {
    // User hasn't completed onboarding, create minimal session
    await createUserSession(
      {
        user: {
          id: user.id.value,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        organization: null,
      },
      await cookies()
    );

    redirect(`/admin/onboarding`);
  }
}

export async function signup(
  unsafeData: z.infer<typeof signupSchema>
): Promise<Error | null> {
  const { success, data } = signupSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to sign you up");

  const register = new UserRegister(
    new DrizzleUserRepository(db),
    new CryptoPasswordHasher()
  );

  const { error, user } = await register.register({
    id: UserId.nextId().value,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });

  if (error || !user) return error as Error;

  // Check if user has an organization with teams
  if (user.organization && user.organization.teams.length > 0) {
    // User has completed onboarding, create full session
    const firstTeam = user.organization.teams[0];
    const country = countries.get(user.organization.country);
    
    if (!country) {
      return new Error("Invalid country code");
    }

    await createUserSession(
      {
        user: {
          id: user.id.value,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        organization: {
          id: user.organization.id.value,
          name: user.organization.name,
          logo: user.organization.logo,
          country: country,
          teams: user.organization.teams.map(team => ({
            id: team.id.value,
            name: team.name,
          })),
          currentTeam: {
            id: firstTeam.id.value,
            name: firstTeam.name,
          },
        },
      },
      await cookies()
    );

    // Redirect to dashboard since user has completed onboarding
    redirect(`/admin/${firstTeam.id.value}/dashboard`);
  } else {
    // User hasn't completed onboarding, create minimal session
    await createUserSession(
      {
        user: {
          id: user.id.value,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        organization: null,
      },
      await cookies()
    );

    redirect(`/admin/onboarding`);
  }
}

export async function logout() {
  await removeUserFromSession(await cookies());
  redirect("/");
}
