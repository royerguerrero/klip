import { Icon } from "@iconify-icon/react";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pb-10 border-b">
      <div className="max-w-[1200px] m-auto px-4 flex flex-col gap-3">
        <h1 className="text-5xl font-semibold tracking-tighter md:w-5/6 text-balance">
          Manten en orden tus agendamientos, pagos e interaciones con tus
          clientes
        </h1>
        <div className="flex gap-2 max-w-[460px] pt-3">
          <Input placeholder="Correo electrónico" />
          <Button size="lg" variant="primary">
            Empezar ahora <Icon icon="ph:caret-right-bold" height={12} />
          </Button>
        </div>
        <Link href="#pricing" className="flex items-center gap-2">
          <Icon icon="ph:sparkle-fill" height={16} className="text-amber-500" />
          <p className="text-sm text-muted-foreground/80 block">
            Adquiere el plan anual y recibe 2 meses gratis
          </p>
        </Link>
        <figure className="border p-3 rounded-xl aspect-video w-full"></figure>
        <p className="text-lg tracking-tight leading-tight text-muted-foreground/80 font-semibold w-5/6 text-balance">
          Usando Klip las empresas logran centralizar sus agendamientos,
          interacciones con sus clientes y pagos. Logrando tener sus servicios
          en internet pemitiendo crecer sus operaciones.
        </p>
      </div>
    </section>
  );
}
