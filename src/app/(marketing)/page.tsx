import Link from "next/link";
import Header from "./_components/header";
import { Button } from "@heroui/react";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <>
      <Header />
      <div className="max-w-[1200px] border-x border-netural-100 mx-auto">
        <section className="h-[100vh] flex flex-col gap-6 items-center justify-center text-center">
          <h1 className="text-5xl tracking-tighter font-semibold w-5/6">
            Klip mantiene en orden tus agendamientos, pagos e interaciones con
            tus clientes
          </h1>
          <p className="tracking-tight text-neutral-500 font-medium w-4/6">
            Usando Klip las empresas logran centralizar sus agendamientos,
            interacciones con sus clientes y pagos. Logrando tener sus servicios
            en internet pemitiendo crecer sus operaciones.
          </p>
          <div>
            <div className="flex gap-3">
              <Link href="/admin/dashboard">
                <Button
                  className="text-sm tracking-tight font-medium"
                  size="sm"
                  variant="flat"
                  color="primary"
                >
                  Digitaliza tus servicios
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button
                  className="text-sm tracking-tight font-medium text-neutral-800"
                  size="sm"
                  variant="light"
                  endContent={<CaretRight size={12} weight="bold" />}
                >
                  Contactar con ventas
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div>Features</div>
          <div>Preview</div>
        </section>
        <section>bento</section>
      </div>
      <footer className="bg-sky-100">
        <div className="text-sky-950 text-sm flex justify-between max-w-[1200px] m-auto px-6 py-3">
          <span>© Klip ⋅ 2025</span>
          <span>Designed in Latam by CodeNewt. Assembled in the web</span>
        </div>
      </footer>
    </>
  );
}
