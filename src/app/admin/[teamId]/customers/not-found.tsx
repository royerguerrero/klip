"use client";

import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";
import { useParams } from "next/navigation";

export default function NotFound() {
  const { teamId, id } = useParams<{ teamId: string; id: string }>();

  return (
    <PageWrapper
      title="Clientes"
      href={`/admin/${teamId}/customers`}
      breadcrumb={[
        { label: "No encontrado", href: `/admin/${teamId}/customers` },
      ]}
      actions={
        <Button asChild>
          <Link href={`/admin/${teamId}/customers`}>
            <Icon icon="ph:plus-bold" height={12} />
            Añadir cliente
          </Link>
        </Button>
      }
    >
      <main className="space-y-4 py-4">
        <section className="px-4 space-y-1 flex flex-col items-center justify-center text-center">
          <Icon
            className="text-muted-foreground/50"
            icon="ph:user-circle-dashed-duotone"
            height={48}
          />
          <h1 className="text-lg font-semibold">Cliente no encontrado</h1>
          <p className="text-muted-foreground text-sm text-balance">
            El cliente con ID &ldquo;{id}&rdquo; no existe o ha sido eliminado.
            Verifica que el ID sea correcto o regresa a la lista de clientes.
          </p>
          <Button variant="primary" className="mt-3" asChild>
            <Link href={`/admin/${teamId}/customers/add`}>
              <Icon icon="ph:plus-bold" height={12} />
              Añadir cliente
            </Link>
          </Button>
        </section>
      </main>
    </PageWrapper>
  );
}
