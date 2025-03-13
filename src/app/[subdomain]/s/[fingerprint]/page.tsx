import { retrieveService } from "../../_lib/data";

type Props = {
  params: Promise<{ fingerprint: string }>;
};

export default async function Page({ params }: Props) {
  const fingerprint = (await params).fingerprint;
  const service = await retrieveService(fingerprint);

  return (
    <main className="md:w-4/6 6 md:max-w-[600px] md:mx-auto p-3 flex flex-col gap-4 relative">
      <section>
        <h1 className="text-xl font-semibold tracking-tight leading-tight">
          {service.title}
        </h1>
        <p className="text-neutral-500 text-sm leading-4 pt-1">
          {service.description}
        </p>
      </section>
      {/* <section className="flex gap-3">
        <div className="border p-3 rounded-xl bg-neutral-100 tracking-tight w-48 cursor-pointer ring-4 leading-none flex flex-col gap-0.5 justify-center">
          <h3 className="font-semibold text-primary-500">Pago Mensual</h3>
          <p className="text-neutral-500 text-sm">$200.000 COP / Mes</p>
        </div>
        <div className="border p-3 rounded-xl bg-neutral-100 tracking-tight w-48 cursor-pointer leading-none flex flex-col gap-0.5 justify-center">
          <h3 className="font-semibold">Pago Total</h3>
          <p className="text-neutral-500 text-sm">$1'800.000 COP</p>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="font-medium uppercase tracking-wide text-xs text-neutral-400 flex gap-1 items-center">
          Ubicación Disponibles <MapTrifold size={16} />
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="border p-3 rounded-xl bg-neutral-100 tracking-tight cursor-pointer leading-none flex flex-col gap-0.5 justify-center">
            <h3 className="font-medium">Sede Villa Elisa</h3>
          </div>
          <div className="border p-3 rounded-xl bg-neutral-100 tracking-tight cursor-pointer leading-none flex flex-col gap-0.5 justify-center">
            <h3 className="font-medium">Sede Tibabuyes</h3>
          </div>
        </div>
      </section> */}
      <section className="flex flex-col gap-3">
        <h2 className="font-semibold tracking-tight text-lg">
          Beneficios y Características
        </h2>
        {service.featuresAndPerks.map((item, index) => (
          <div key={index} className="flex gap-2 items-start">
            <span className="border bg-neutral-100 p-2 rounded-lg w-10 h-10 text-xl leading-none grid place-items-center">
              {item.icon}
            </span>
            <div>
              <h2 className="font-semibold tracking-tight">{item.title}</h2>
              <p className="text-neutral-500 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
