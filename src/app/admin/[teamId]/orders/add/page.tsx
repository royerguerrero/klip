import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import OrderForm from "../_components/forms/order";
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
      title="Ordenes"
      href={`/admin/${teamId}/orders`}
      breadcrumb={[
        { label: "Añadir Orden", href: `/admin/${teamId}/orders/add` },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/orders`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[800px] mx-auto py-6">
        <OrderForm mode="create" teamId={teamId} />
      </main>
    </PageWrapper>
  );
} 