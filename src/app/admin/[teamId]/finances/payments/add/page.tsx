import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
// import PaymentForm from "../_components/forms/payment";
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
      title="Finanzas"
      href={`/admin/${teamId}/finances`}
      breadcrumb={[
        { label: "Pagos", href: `/admin/${teamId}/finances/payments` },
        { label: "Añadir Pago", href: `/admin/${teamId}/finances/payments/add` },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/payments`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[800px] mx-auto py-6">
        {/* <PaymentForm mode="create" /> */}
      </main>
    </PageWrapper>
  );
}
