import { Suspense } from "react";
import Image from "next/image";
import LoginForm from "./_components/forms/login";
import Link from "next/link";
import env from "@/contexts/shared/infrastructure/persistence/drizzle/env";

export default async function Page() {
  console.log(env);
  return (
    <div className="h-dvh grid items-center">
      <section className="border bg-neutral-100 rounded-xl p-1 w-96 m-auto">
        <div className="bg-white rounded-xl border p-3 flex flex-col gap-3">
          <div className="flex flex-col items-center gap-1">
            <Image
              src="/klip-icon.svg"
              width={40}
              height={40}
              alt="Klip Logo"
            />
            <h1 className="text-xl font-semibold tracking-tight">
              Ingresa a Klip
            </h1>
            <p className="text-neutral-400 text-center text-sm">
              Bienvenido a Klip. Inicia session para continuar
            </p>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
          <div className="text-xs text-neutral-400 text-center font-medium flex justify-between">
            <Link href="/auth/forgot-password">¿Olvidaste tu contraseña?</Link>
            <Link href="">Soporte</Link>
          </div>
        </div>
        <p className="text-xs text-neutral-400 text-center font-medium py-1 leading-none pt-2">
          ¿Aun no tienes una cuenta?
          <Link
            href="/auth/onboarding"
            className="mx-1 text-neutral-600 font-semibold"
          >
            Registrase
          </Link>
        </p>
      </section>
    </div>
  );
}
