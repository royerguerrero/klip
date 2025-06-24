import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { listCustomers } from "./_lib/data";

type Props = {
  params: {
    teamId: string;
  };
};

export default async function Page({ params }: Props) {
  const { teamId } = await params;
  const customers = await listCustomers();

  return (
    <PageWrapper
      title="Clientes"
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/customers/add`}>
            <Icon icon="ph:plus-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="space-y-3">

      </main>
    </PageWrapper>
  );
}
