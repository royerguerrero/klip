import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { listOrders } from "./_lib/data";
import { columns } from "./_components/tables/orders/columns";
import { DataTable } from "./_components/tables/orders/data-table";
import { Heading } from "../_components/heading";

type Props = {
  params: Promise<{
    teamId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { teamId } = await params;
  const orders = await listOrders();

  return (
    <PageWrapper title="Ordenes">
      <main className="space-y-3">
        <Heading title="Ordenes" className="p-4 pb-0">
          <Button variant="primary" asChild>
            <Link href={`/admin/${teamId}/orders/add`}>
              <Icon icon="ph:plus-bold" height={12} />
              Crear orden
            </Link>
          </Button>
        </Heading>
        <section className="px-3">
          <DataTable columns={columns} data={orders} />
        </section>
      </main>
    </PageWrapper>
  );
}
