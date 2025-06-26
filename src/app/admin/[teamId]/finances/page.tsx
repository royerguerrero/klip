import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Heading } from "@/app/admin/[teamId]/_components/heading";
import { Button } from "@/app/_components/ui/button";
import { Icon } from "@iconify-icon/react";
import { Stat } from "@/app/_components/ui/stat";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const stats = [
    {
      title: "Ingresos Semanales",
      percentage: -10,
      value: 2600000,
      format: "price",
    },
    {
      title: "Ingresos Diarios",
      percentage: 200,
      value: 112900,
      format: "price",
    },
    {
      title: "Ordenes Nuevas",
      percentage: -2,
      value: 64,
      format: "number",
    },
    {
      title: "Clientes Nuevos",
      percentage: 3,
      value: 12,
      format: "number",
    },
  ];

  return (
    <PageWrapper title="Finanzas">
      <main className="space-y-3">
        <Heading title="Finanzas" className="p-4 pb-0">
          <Button>
            <Icon icon="ph:calendar-blank-bold" height={16} />
            {new Date().toLocaleDateString()}
          </Button>
          <Button variant="primary" asChild>
            <Link href={`/admin/${teamId}/finances/payments/add`}>
              <Icon icon="ph:plus-bold" height={16} />
              Registrar pago
            </Link>
          </Button>
        </Heading>
        <div className="px-4 pt-2 space-y-6">
          <section className="grid grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <Stat
                key={stat.title}
                title={stat.title}
                value={stat.value}
                percentage={stat.percentage}
                format={stat.format as "price" | "number" | "currency"}
                className={`border-r ${
                  index === stats.length - 1 ? "" : "last:border-r-0"
                }`}
              />
            ))}
          </section>
          <section className="h-96 bg-neutral-100 rounded-xl p-3">
            Dashboard
          </section>
          <div className="grid grid-cols-2 gap-6">
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-secondary-foreground leading-none">
                  Ultimos pagos
                </h2>
                <Button variant="outline" asChild>
                  <Link href={`/admin/${teamId}/customers/orders/`}>
                    Detalle
                  </Link>
                </Button>
              </div>
              <div className="aspect-video bg-neutral-100 rounded-lg"></div>
            </section>
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-secondary-foreground leading-none">
                  Pagos pendientes
                </h2>
                <Button variant="outline" asChild>
                  <Link href={`/admin/${teamId}/customers/payments/`}>
                    Detalle
                  </Link>
                </Button>
              </div>
              <div className="aspect-video bg-neutral-100 rounded-lg"></div>
            </section>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
