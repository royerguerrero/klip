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

export async function login(unsafeData: z.infer<typeof loginSchema>) {
  const { success, data } = loginSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to log you in");

  const authenticator = await new UserAuthenticator(
    new DrizzleUserRepository(),
    new CryptoPasswordHasher()
  );
  const { error, user } = await authenticator.authenticate(
    data.email,
    data.password
  );

  if (error || !user) return error as Error;

  await createUserSession(
    {
      id: user.id.value,
      email: user.email.value,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    await cookies()
  );

  redirect(`/admin/onboarding`);
}

export async function signup(
  unsafeData: z.infer<typeof signupSchema>
): Promise<Error | null> {
  const { success, data } = signupSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to sign you up");

  const register = new UserRegister(
    new DrizzleUserRepository(),
    new CryptoPasswordHasher()
  );

  const { error, user } = await register.register({
    id: UserId.nextId().value,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    teams: [],
  });

  if (error || !user) return error as Error;

  await createUserSession(
    {
      id: user.id.value,
      email: user.email.value,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    await cookies()
  );

  redirect(`/admin/onboarding`);
}

export async function logout() {
  await removeUserFromSession(await cookies());
  redirect("/");
}
