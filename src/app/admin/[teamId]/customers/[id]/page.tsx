import { Button } from "@/app/_components/ui/button";
import { retrieveCustomer } from "../_lib/data";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

type Props = {
  params: Promise<{
    teamId: string;
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id, teamId } = await params;
  const customer = await retrieveCustomer(id);

  return (
    <div className="px-4 space-y-6">
      {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <article className="rounded-xl p-1.5 bg-neutral-100 flex flex-col gap-0.5">
          <div className="flex items-center justify-between p-1.5">
            <h2 className="font-bold text-foreground/50 text-xs uppercase tracking-wide leading-none">
              Información personal
            </h2>
          </div>
          <div className="h-full bg-background rounded-lg border px-3 py-1.5 grid grid-cols-2 gap-3 text-sm">
            <span className="text-sm text-muted-foreground font-medium">
              Nombre completo:
            </span>
            <span>
              {customer?.firstName} {customer?.lastName}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              Fecha de nacimiento:
            </span>
            <span>{customer?.dateBirth.toLocaleDateString()}</span>
            <span className="text-sm text-muted-foreground font-medium">
              Email:
            </span>
            <span>{customer?.email}</span>
            <span className="text-sm text-muted-foreground font-medium">
              Teléfono:
            </span>
            <span>
              {customer?.phone?.prefix} {customer?.phone?.number}
            </span>
          </div>
        </article>
        <article className="">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary-foreground leading-none">
              Linea temporal
            </h2>
            <Button variant="outline">
              Hoy
              <Icon icon="ph:caret-down-bold" height={14} />
            </Button>
          </div>
        </article>
      </section> */}
      <div className="grid grid-cols-2 gap-6">
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary-foreground leading-none">
              Ordenes
            </h2>
            <Button variant="outline" asChild>
              <Link href={`/admin/${teamId}/customers/${id}/orders/`}>
                Detalle
              </Link>
            </Button>
          </div>
          <div className="aspect-video bg-neutral-100 rounded-lg"></div>
        </section>
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary-foreground leading-none">
              Pagos
            </h2>
            <Button variant="outline" asChild>
              <Link href={`/admin/${teamId}/customers/${id}/payments/`}>
                Detalle
              </Link>
            </Button>
          </div>
          <div className="aspect-video bg-neutral-100 rounded-lg"></div>
        </section>
      </div>
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-secondary-foreground leading-none">
            Agendamientos
          </h2>
          <Button variant="outline" asChild>
            <Link href={`/admin/${teamId}/customers/${id}/appointments/`}>
              Detalle
            </Link>
          </Button>
        </div>
        <div className="aspect-video bg-neutral-100 rounded-lg"></div>
      </section>
    </div>
  );
}
