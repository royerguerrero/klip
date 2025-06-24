import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import ArchiveCustomerForm from "@/app/admin/[teamId]/customers/_components/forms/archive-customer";
import { retrieveCustomer } from "../../_lib/data";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    teamId: string;
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { teamId, id } = await params;
  const customer = await retrieveCustomer(id);

  if (!customer) {
    notFound();
  }

  return (
    <PageWrapper
      title="Clientes"
      href={`/admin/${teamId}/customers`}
      breadcrumb={[
        {
          label: `${customer.firstName} ${customer.lastName}`,
          href: `/admin/${teamId}/customers/${customer.id}`,
        },
        {
          label: "Archivar cliente",
          href: `/admin/${teamId}/customers/archive/${customer.id}`,
        },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/customers/${customer.id}`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[600px] mx-auto py-6">
        <ArchiveCustomerForm customer={customer} />
      </main>
    </PageWrapper>
  );
}
