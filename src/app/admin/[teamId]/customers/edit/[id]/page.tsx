import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import CustomerForm from "@/app/admin/[teamId]/customers/_components/forms/customer";
import { retrieveCustomer } from "@/app/admin/[teamId]/customers/_lib/data";
import { notFound } from "next/navigation";
import { countries } from "@/app/admin/_lib/countries";

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

  const formData = {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    documentType: customer.document.type,
    documentNumber: customer.document.value,
    phonePrefix:
      [...countries.values()].find((c) => c.prefix === customer.phone.prefix)
        ?.code ?? customer.phone.prefix,
    phone: customer.phone.number,
    email: customer.email,
    dob: customer.dateBirth,
  };

  return (
    <PageWrapper
      title="Clientes"
      href={`/admin/${teamId}/customers`}
      breadcrumb={[
        {
          label: `${customer.firstName} ${customer.lastName}`,
          href: `/admin/${teamId}/customers/${id}`,
        },
        {
          label: "Editar cliente",
          href: `/admin/${teamId}/customers/${id}/edit`,
        },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/customers/${id}`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="p-3 max-w-[800px] mx-auto py-6">
        <CustomerForm mode="edit" initialData={formData} />
      </main>
    </PageWrapper>
  );
}
