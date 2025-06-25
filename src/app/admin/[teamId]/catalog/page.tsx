import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { listServices } from "./_lib/data";
import { columns } from "./_components/tables/services/columns";
import { DataTable } from "./_components/tables/services/data-table";
import { Heading } from "../_components/heading";

type Props = {
  params: Promise<{
    teamId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { teamId } = await params;
  const services = await listServices();

  return (
    <PageWrapper
      title="Catálogo"
      actions={
        <Button className="font-medium gap-3" asChild>
          <Link href={`/admin/${teamId}/catalog/#search`}>
            <Icon icon="ph:magnifying-glass-bold" height={16} />
            Buscar en el catálogo...
          </Link>
        </Button>
      }
    >
      <main className="space-y-3">
        <Heading title="Catálogo" className="p-4 pb-0">
          <Button variant="primary" asChild>
            <Link href={`/admin/${teamId}/catalog/add`}>
              <Icon icon="ph:plus-bold" height={12} />
              Añadir servicio
            </Link>
          </Button>
        </Heading>
        <section className="px-3">
          <DataTable columns={columns} data={services} />
        </section>
      </main>
    </PageWrapper>
  );
}
