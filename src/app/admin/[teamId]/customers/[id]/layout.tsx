import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { retrieveCustomer } from "../_lib/data";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { CustomerNav } from "../_components/customer-nav";
import { ContactDrawer } from "../_components/contact-drawer";
import { notFound } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Heading } from "../../_components/heading";

type Props = {
  params: Promise<{
    id: string;
    teamId: string;
  }>;
  children: React.ReactNode;
};

export default async function CustomerLayout({ params, children }: Props) {
  const { id, teamId } = await params;
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
          href: `/admin/${teamId}/customers/${id}`,
        },
      ]}
      actions={
        <Button size="icon" asChild>
          <Link href={`/admin/${teamId}/customers/`}>
            <Icon icon="ph:x-bold" height={14} />
          </Link>
        </Button>
      }
    >
      <main className="space-y-4 py-4">
        <Heading
          title={`${customer.firstName} ${customer.lastName}`}
          className="px-4"
        >
          <>
            <ContactDrawer
              phone={`${customer.phone.prefix} ${customer.phone.number}`}
              email={customer.email}
              customerName={`${customer.firstName} ${customer.lastName}`}
            >
              <Button>
                Contactar
              </Button>
            </ContactDrawer>
            <Button variant="secondary" asChild>
              <Link href={`/admin/${teamId}/orders/add?customer=${id}`}>
                <Icon icon="ph:plus" height={14} />
                Crear orden
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="size-8">
                  <Icon icon="ph:caret-down-bold" height={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/customers/edit/${id}`}>
                    <Icon icon="ph:user-circle-gear-bold" height={16} />
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/customers/archive/${id}`}>
                    <Icon icon="ph:archive-bold" height={16} />
                    Archivar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/customers/${id}/payments`}>
                    <Icon icon="ph:receipt-bold" height={16} />
                    Ver últimos pagos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/admin/${teamId}/customers/${id}/payments?status=pending`}
                  >
                    <Icon icon="ph:clock-bold" height={16} />
                    Ver pagos pendientes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/agenda?customer=${id}`}>
                    <Icon icon="ph:calendar-plus-bold" height={16} />
                    Nuevo agendamiento
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        </Heading>
        <CustomerNav customerId={id} />
        {children}
      </main>
    </PageWrapper>
  );
}
