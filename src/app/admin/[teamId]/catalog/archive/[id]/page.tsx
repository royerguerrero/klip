import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import ArchiveServiceForm from "../../_components/forms/archive-service";
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

  return (
    <PageWrapper
      title="Catálogo"
      href={`/admin/${teamId}/catalog`}
      breadcrumb={[
        {
          label: service.name,
          href: `/admin/${teamId}/catalog/${service.id}`,
        },
        {
          label: "Archivar servicio",
          href: `/admin/${teamId}/catalog/archive/${service.id}`,
        },
      ]}
    >
      <main className="p-3 max-w-[600px] mx-auto py-6">
        <ArchiveServiceForm service={service} />
      </main>
    </PageWrapper>
  );
} 