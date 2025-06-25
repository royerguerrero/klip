import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import OrderForm from "../../_components/forms/order";
import { retrieveOrder } from "../../_lib/data";
import { notFound } from "next/navigation";
import { formatOrderId } from "@/app/_lib/utils";

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
          label: `# ${formatOrderId(order.id)}`,
          href: `/admin/${teamId}/orders/${id}`,
        },
        {
          label: "Editar orden",
          href: `/admin/${teamId}/orders/edit/${id}`,
        },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/orders/${id}`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[800px] mx-auto py-6">
        <OrderForm mode="edit" initialData={order} teamId={teamId} />
      </main>
    </PageWrapper>
  );
}
