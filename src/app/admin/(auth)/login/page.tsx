import { Button } from "@/app/_components/ui/button";
import LoginForm from "@/app/admin/(auth)/_components/forms/login";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUserSession } from "../_lib/data";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUserSession();

  return (
    <main className="grid place-items-center h-screen bg-neutral-50 p-3">
      <section className="flex flex-col items-center justify-center w-full md:w-[420px] p-1.5 rounded-2xl bg-neutral-100 border">
        <div className="w-full bg-background p-3 rounded-lg border border-neutral-200 space-y-4">
          <div className="text-center">
            <Link href="/">
              <Image
                src="/klip-icon.svg"
                alt="Klip Logo"
                className="mb-2 mx-auto"
                priority={true}
                width={36}
                height={36}
              />
            </Link>
            <h1 className="text-xl font-semibold tracking-tight">
              ¡Bienvenido de nuevo!
            </h1>
            <p className="text-sm text-muted-foreground">
              Ingresa tus credenciales a Klip
            </p>
          </div>
          <LoginForm />
        </div>
        <Button variant="link" className="w-full text-sm pt-3" asChild>
          <Link href="/admin/signup">
            ¿Aún no tienes una cuenta?
            <span className="text-foreground">Regístrate</span>
          </Link>
        </Button>
      </section>
    </main>
  );
}
