import { z } from "zod";

import {
  loginSchema,
  signupSchema,
} from "@/app/admin/(auth)/_components/forms/schemas";
import { redirect } from "next/navigation";

export async function login(unsafeData: z.infer<typeof loginSchema>) {
  const { success, data } = loginSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to log you in");

  const authenticator = await new UserAuthenticator(
    new DrizzleUserRepository(),
    new CrpytoPasswordRepository()
  );

  const { error, user } = await authenticator.authenticate({
    email: data.email,
    password: data.password,
  });

  if (error || !user) return error as Error;

  redirect(`/admin/${user.id}`);
}

export async function signup(unsafeData: z.infer<typeof signupSchema>) {
  const { success, data } = signupSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to sign you up");

  redirect(`/admin/onboarding?email=${data.email}`);

  //   const creator = await new UserCreator(
  //     new DrizzleUserRepository(),
  //     new CrpytoPasswordRepository(),
  //   )

  //   const { error, user } = await creator.create({
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     email: data.email,
  //     password: data.password,
  //   })

  //   return user;
}

export async function logout() {}
