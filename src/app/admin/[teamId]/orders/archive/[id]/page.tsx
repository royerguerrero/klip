import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import ArchiveOrderForm from "../../_components/forms/archive-order";
import { retrieveOrder } from "../../_lib/data";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    teamId: string;
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { teamId, id } = await params;
  const order = await retrieveOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <PageWrapper
      title="Ordenes"
      href={`/admin/${teamId}/orders`}
      breadcrumb={[
        {
          label: `Orden ${order.id}`,
          href: `/admin/${teamId}/orders/${order.id}`,
        },
        {
          label: "Archivar orden",
          href: `/admin/${teamId}/orders/archive/${order.id}`,
        },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/orders/${order.id}`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[600px] mx-auto py-6">
        <ArchiveOrderForm order={order} />
      </main>
    </PageWrapper>
  );
} 