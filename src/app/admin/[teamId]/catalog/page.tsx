import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

type Props = {
  params: Promise<{
    teamId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { teamId } = await params;

  return (
    <PageWrapper
      title="Catálogo"
      actions={
        <Button asChild>
          <Link href={`/admin/${teamId}/catalog/add`}>
            <Icon icon="ph:plus-bold" height={12} />
            Añadir servicio
          </Link>
        </Button>
      }
    >
      <main className="px-4">
        <h2 className="font-semibold text-secondary-foreground">Servicios</h2>
        Table
      </main>
    </PageWrapper>
  );
}
