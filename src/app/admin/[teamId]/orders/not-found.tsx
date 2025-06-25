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
      title="Ordenes"
      href={`/admin/${teamId}/orders`}
      breadcrumb={[
        { label: "No encontrado", href: `/admin/${teamId}/orders` },
      ]}
      actions={
        <Button asChild>
          <Link href={`/admin/${teamId}/orders/add`}>
            <Icon icon="ph:plus-bold" height={12} />
            Añadir orden
          </Link>
        </Button>
      }
    >
      <main className="space-y-4 py-4">
        <section className="px-4 space-y-1 flex flex-col items-center justify-center text-center">
          <Icon
            className="text-muted-foreground/50"
            icon="ph:package-dashed-duotone"
            height={48}
          />
          <h1 className="text-lg font-semibold">Orden no encontrada</h1>
          <p className="text-muted-foreground text-sm text-balance">
            La orden con ID &ldquo;{id}&rdquo; no existe o ha sido eliminada.
            Verifica que el ID sea correcto o regresa a la lista de órdenes.
          </p>
          <Button variant="primary" className="mt-3" asChild>
            <Link href={`/admin/${teamId}/orders/add`}>
              <Icon icon="ph:plus-bold" height={12} />
              Añadir orden
            </Link>
          </Button>
        </section>
      </main>
    </PageWrapper>
  );
} 