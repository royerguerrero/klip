import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import ServiceForm from "../../_components/forms/service";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { retrieveService } from "../../_lib/data";
import { notFound } from "next/navigation";

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
    notFound();
  }

  const initialData = {
    name: service.name,
    description: service.description,
    priceAmount: service.price.amount,
    priceCurrency: service.price.currency,
  };

  return (
    <PageWrapper
      title="Catálogo"
      href={`/admin/${teamId}/catalog`}
      breadcrumb={[
        { label: service.name, href: `/admin/${teamId}/catalog/${id}` },
        { label: "Editar", href: `/admin/${teamId}/catalog/edit/${id}` },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/catalog/${id}`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[800px] mx-auto py-6">
        <ServiceForm mode="edit" initialData={initialData} />
      </main>
    </PageWrapper>
  );
} 