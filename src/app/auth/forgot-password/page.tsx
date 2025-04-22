import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ResetPasswordForm from "./_components/forms/reset-password";

export default async function Page() {
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
              Olvidaste tu contraseña
            </h1>
            <p className="text-neutral-400 text-center text-sm">
              Restablece el acceso a tu cuenta con un código enviado a tu correo electrónico
            </p>
          </div>
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
          <div className="text-xs text-neutral-400 text-center font-medium flex justify-between">
            <Link href="/auth/login">Iniciar sesión</Link>
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
