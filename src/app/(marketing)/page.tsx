import Link from "next/link";
import Header from "./_components/header";
import { Button } from "@heroui/react";
import {
  CalendarDots,
  CardsThree,
  CaretRight,
  UsersThree,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klip | Organiza tus agendamientos, finanzas y clientes",
  description:
    "Klip es una plataforma para organizar tus agendamientos, pagos y clientes de manera sencilla y eficiente.",
};

export default function Home() {
  return (
    <div className="bg-sky-50/50">
      <span className="fixed w-full max-w-[1240px] left-1/2 -translate-x-1/2 h-full border-x border-neutral-200"></span>
      <div className="border-b">
        <Header />
      </div>
      <div className="max-w-[1200px] mx-auto">
        <section className="mt-40 mb-20 flex flex-col gap-6 items-center justify-center text-center">
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
          <div className="border-[24px] border-neutral-950 rounded-[42px] w-5/6 aspect-video ring-4 ring-neutral-300 m-10"></div>
          <div className="grid grid-cols-4 gap-8 w-5/6">
            <div className="flex flex-col gap-1 items-center tracking-tight">
              <CalendarDots size={24} weight="fill" className="text-sky-500" />
              <h2 className="font-semibold">Agendamiento</h2>
              <p className="font-medium text-neutral-500 text-sm leading-snug">
                Organiza todos los agendamietos de tu equipo en un solo lugar
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center tracking-tight">
              <CardsThree
                size={24}
                weight="fill"
                className="text-fuchsia-500"
              />
              <h2 className="font-semibold">Catalogo</h2>
              <p className="font-medium text-neutral-500 text-sm leading-snug">
                Incrementa tus ventas y clientes con un canal de ventas online
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center tracking-tight">
              <UsersThree size={24} weight="fill" className="text-rose-500" />
              <h2 className="font-semibold">Clientes</h2>
              <p className="font-medium text-neutral-500 text-sm leading-snug">
                Obten la informacion de futuros agendamientos y proximos pagos
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center tracking-tight">
              <Wallet size={24} weight="fill" className="text-lime-500" />
              <h2 className="font-semibold">Finanzas</h2>
              <p className="font-medium text-neutral-500 text-sm leading-snug">
                Las cuentas claras y el chocolate espeso. Recibe pagos y cobra
              </p>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className="text-neutral-500 text-sm flex justify-between max-w-[1240px] m-auto px-4 py-3">
          <span>© Klip ⋅ {new Date().getFullYear()}</span>
          <span>Designed in LATAM by CodeNewt. Assembled in the web</span>
        </div>
      </footer>
    </div>
  );
}
