import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { retrieveCustomer } from "../_lib/data";

type Props = {
  params: Promise<{
    id: string;
    teamId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id, teamId } = await params;
  const customer = await retrieveCustomer(id);

  return (
    <PageWrapper
      title="Clientes"
      href={`/admin/${teamId}/customers`}
      breadcrumb={[
        {
          label: customer.firstName + " " + customer.lastName,
          href: `/admin/customers/${id}`,
        },
      ]}
    >
      <main className="p-3">
        <h1 className="text-xl font-semibold">Detalle de cliente</h1>
      </main>
    </PageWrapper>
  );
}
