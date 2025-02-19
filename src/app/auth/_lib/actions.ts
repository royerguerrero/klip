"use server";

import { signIn, signOut } from "@/app/auth";
import { AuthError } from "next-auth";

export async function authenticateUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales Invalidas";
        default:
          return "Upppsss... Algo salio mal!";
      }
    }
    throw error;
  }
}

export async function deauthenticate() {
  await signOut({ redirectTo: "/" });
}
