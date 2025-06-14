import { retrieveService } from "@/app/[subdomain]/_lib/data";
import { Button, Input } from "@heroui/react";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";

type Props = {
  params: Promise<{ id: string; subdomain: string }>;
};

export default async function Page({ params }: Props) {
  const { id, subdomain } = await params;
  const service = await retrieveService(id);
  const futureAvailability = [{}, {}, {}, {}];

  return (
    <main className="w-full md:max-w-[520px] mx-auto px-3 md:px-0 space-y-3 pb-48">
      {/* <article className="rounded-lg border p-1 px-2 bg-neutral-100">
        <h2 className="text-base font-semibold">{service.title}</h2>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-tight">
          {service.description}
        </p>
        <div className="flex justify-between items-center pt-0.5">
          <p className="text-sm font-medium my-1">
            {"$ 600.000"}
            <span className="text-neutral-500">・3 Sesiones・1000 horas</span>
          </p>
        </div>
      </article> */}
      <figure className="aspect-video border rounded-xl bg-neutral-100"></figure>
      <section>
        <h1 className="text-xl font-semibold">{service.title}</h1>
        <p className="text-sm text-neutral-500 leading-tight">
          {service.description}
        </p>
        <p className="text-sm font-medium pt-2">
          {"$ 600.000"}
          <span className="text-neutral-500">・3 Sesiones・1000 horas</span>
        </p>
      </section>
      <hr />
      <section className="space-y-2">
        <h2 className="font-semibold">¿Que incluye?</h2>
        <ul className="grid gap-2 p-1.5 bg-neutral-100 rounded-xl border">
          {service.features.map((feature, index) => (
            <li className="p-2 bg-white rounded-lg flex gap-2" key={index}>
              <SealCheck className="size-4.5 text-neutral-500" weight="fill" />
              <div className="space-y-1">
                <h3 className="text-[15px] leading-tight font-medium">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-4">
                  {feature.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <hr />
      <section>
        <h2 className="font-semibold">Location / Modality</h2>
      </section>
      <hr />
      <section>
        <h2 className="font-semibold">Proveedores</h2>
      </section>
      <hr />
      <section className="space-y-2">
        <h2 className="font-semibold">Lo que debes saber</h2>
        <div className="grid gap-2 p-1.5 bg-neutral-100 rounded-xl border">
          <div className="p-2 bg-white rounded-lg space-y-1">
            <h3 className="text-[15px] leading-tight font-medium">
              Política de cancelación
            </h3>
            <p className="text-neutral-500 text-sm leading-4">
              Si cancelas la reservación al menos 3 días antes del horario de
              inicio, recibirás un reembolso total.
            </p>
          </div>
        </div>
      </section>
      <section className="fixed border p-1.5 bottom-16 rounded-xl right-0 left-0 mx-3 z-50 bg-neutral-50/50 backdrop-blur max-w-[540px] md:mx-auto space-y-2">
        <div>
          <Input label="Numero de teléfono" size="sm" />
        </div>
        <Button size="sm" className="w-full text-sm dark bg-neutral-950">
          Continuar
        </Button>
      </section>
    </main>
  );
}
