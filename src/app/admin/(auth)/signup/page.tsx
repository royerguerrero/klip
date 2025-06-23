import { Button } from "@/app/_components/ui/button";
import SignupForm from "@/app/admin/(auth)/_components/forms/singup";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="grid place-items-center h-screen bg-neutral-50 p-3">
      <section className="flex flex-col items-center justify-center w-full md:w-[420px] p-1.5 rounded-2xl bg-neutral-100 border">
        <div className="w-full bg-background p-3 rounded-lg border border-neutral-200 space-y-4">
          <div className="text-center space-y-2">
            <Link href="/">
              <Image
                src="/klip-icon.svg"
                alt="Klip Logo"
                className="mx-auto mb-2"
                width={36}
                height={36}
              />
            </Link>
            <h1 className="text-xl font-semibold tracking-tight">
              ¡Bienvenido a Klip!
            </h1>
            <p className="text-sm text-muted-foreground">
              Ayudamos a las empresas de servicios a vender sus servicios a
              travez de internet y mantener en orden sus agendamientos, pagos y
              clientes
            </p>
          </div>
          <SignupForm />
        </div>
        <Button variant="link" className="w-full text-sm pt-3" asChild>
          <Link href="/admin/login">
            ¿Ya tienes una cuenta?
            <span className="text-foreground">Inicia sesión</span>
          </Link>
        </Button>
      </section>
    </main>
  );
}
