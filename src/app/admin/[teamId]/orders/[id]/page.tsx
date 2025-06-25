import { retrieveOrder } from "../_lib/data";

type Props = {
  params: Promise<{
    id: string;
    teamId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  await retrieveOrder(id);

  return (
    <>
      <section className="px-4 grid grid-cols-5 gap-3">
        <article className="border rounded-lg p-3 col-span-2">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Detalles de la Orden</h3>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-muted-foreground">Cliente ID:</span>
              <p className="text-sm font-medium">12345</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Servicio ID:</span>
              <p className="text-sm font-medium">SERV-001</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Onboarding ID:</span>
              <p className="text-sm font-medium">ONB-001</p>
            </div>
          </div>
        </article>
        <article className="border rounded-lg p-3">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Estado</h3>
          <p className="text-sm">Activo</p>
        </article>
        <article className="border rounded-lg p-3">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Factura</h3>
          <p className="text-sm">INV-001</p>
        </article>
        <article className="border rounded-lg p-3">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Pago</h3>
          <p className="text-sm">PAY-001</p>
        </article>
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">
          Historial de Pagos
        </h2>
        <div className="border rounded-lg p-4 text-center text-muted-foreground">
          Tabla de pagos
        </div>
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">Actividad</h2>
        <div className="border rounded-lg p-4 text-center text-muted-foreground">
          Tabla de actividad
        </div>
      </section>
    </>
  );
} 