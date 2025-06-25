import { retrieveService } from "../_lib/data";

type Props = {
  params: Promise<{
    teamId: string;
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { teamId, id } = await params;
  const service = await retrieveService(id);

  if (!service) {
    return null;
  }

  return (
    <>
      <section className="px-4 grid grid-cols-5 gap-3">
        <article className="border rounded-lg p-3 col-span-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Descripción</h3>
              <p className="text-sm mt-1">{service.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Precio</h3>
              <p className="text-lg font-semibold mt-1">
                {service.price.currency} {service.price.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </article>
        <article className="border rounded-lg p-3">Estadísticas</article>
        <article className="border rounded-lg p-3">Agendamientos</article>
        <article className="border rounded-lg p-3">Ingresos</article>
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">
          Agendamientos recientes
        </h2>
        Table
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">Historial de precios</h2>
        Table
      </section>
    </>
  );
} 