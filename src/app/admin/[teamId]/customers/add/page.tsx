import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import CustomerForm from "../_components/forms/customer";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

type Props = {
  params: {
    teamId: string;
  };
};

export default async function Page({ params }: Props) {
  const { teamId } = await params;

  return (
    <PageWrapper
      title="Clientes"
      href={`/admin/${teamId}/customers`}
      breadcrumb={[
        { label: "Añadir Cliente", href: `/admin/${teamId}/customers/add` },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/customers`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[800px] mx-auto py-6">
        <CustomerForm mode="create" />
      </main>
    </PageWrapper>
  );
}
