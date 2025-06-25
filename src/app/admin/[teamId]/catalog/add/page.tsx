import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import ServiceForm from "../_components/forms/service";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

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
      href={`/admin/${teamId}/catalog`}
      breadcrumb={[
        { label: "Añadir Servicio", href: `/admin/${teamId}/catalog/add` },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/catalog`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[800px] mx-auto py-6">
        <ServiceForm mode="create" />
      </main>
    </PageWrapper>
  );
} 