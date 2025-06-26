import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Heading } from "@/app/admin/[teamId]/_components/heading";
import { Button } from "@/app/_components/ui/button";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;

  return (
    <PageWrapper
      title="Pagos"
      actions={
        <Button className="font-medium gap-3 w-[180px]" asChild>
          <Link href={`/admin/${teamId}/payments/#search`}>
            <Icon icon="ph:magnifying-glass-bold" height={16} />
            Buscar pagos...
          </Link>
        </Button>
      }
    >
      <main className="space-y-3">
        <Heading title="Pagos" className="p-4 pb-0">
          <Button variant="primary" asChild>
            <Link href={`/admin/${teamId}/payments/add`}>
              <Icon icon="ph:plus-bold" height={12} />
              Añadir pago
            </Link>
          </Button>
        </Heading>
      </main>
    </PageWrapper>
  );
}
