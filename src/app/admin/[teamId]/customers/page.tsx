import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { listCustomers } from "./_lib/data";
import { columns } from "./_components/tables/customers/columns";
import { DataTable } from "./_components/tables/customers/data-table";
import { Heading } from "../_components/heading";

type Props = {
  params: Promise<{
    teamId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { teamId } = await params;
  const customers = await listCustomers();

  return (
    <PageWrapper title="Clientes">
      <main className="space-y-3">
        <Heading title="Clientes" className="p-4 pb-0">
          <Button>Importar</Button>
          <Button variant="primary" asChild>
            <Link href={`/admin/${teamId}/customers/add`}>
              <Icon icon="ph:plus-bold" height={12} />
              Añadir cliente
            </Link>
          </Button>
        </Heading>
        <section className="px-3">
          <DataTable columns={columns} data={customers} />
        </section>
      </main>
    </PageWrapper>
  );
}
