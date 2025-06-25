import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { retrieveOrder } from "../_lib/data";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
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
import { formatOrderId } from "@/app/_lib/utils";

type Props = {
  params: Promise<{
    id: string;
    teamId: string;
  }>;
  children: React.ReactNode;
};

export default async function OrderLayout({ params, children }: Props) {
  const { id, teamId } = await params;
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
          label: `#${formatOrderId(order.id)}`,
          href: `/admin/${teamId}/orders/${id}`,
        },
      ]}
      actions={
        <Button asChild>
          <Link href={`/admin/${teamId}/orders/edit/${id}`}>Editar</Link>
        </Button>
      }
    >
      <main className="space-y-4 py-4">
        <Heading title={`#${formatOrderId(order.id)}`} className="px-4">
          <>
            <Button variant="secondary" asChild>
              <Link href={`/admin/${teamId}/orders/add`}>
                Crear nueva orden
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-8">
                  <Icon icon="ph:dots-three-vertical-bold" height={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/orders/edit/${id}`}>
                    <Icon icon="ph:pencil-bold" height={16} />
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/orders/archive/${id}`}>
                    <Icon icon="ph:archive-bold" height={16} />
                    Archivar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/customers/${order.customer.id}`}>
                    <Icon icon="ph:user-circle-bold" height={16} />
                    Ver cliente
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/catalog/${order.services[0].id}`}>
                    <Icon icon="ph:package-bold" height={16} />
                    Ver servicio
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        </Heading>
        {children}
      </main>
    </PageWrapper>
  );
} 