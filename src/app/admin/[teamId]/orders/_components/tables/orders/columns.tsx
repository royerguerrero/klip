"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/app/admin/[teamId]/orders/_lib/types";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customerId",
    header: "Cliente ID",
  },
  {
    accessorKey: "serviceId",
    header: "Servicio ID",
  },
  {
    accessorKey: "onboardingId",
    header: "Onboarding ID",
  },
  {
    accessorKey: "externalInvoiceId",
    header: "Factura Externa",
  },
  {
    accessorKey: "paymentId",
    header: "Pago ID",
  },
  {
    accessorKey: "externalReciptId",
    header: "Recibo Externo",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button variant="secondary" asChild>
            <Link
              href={`/admin/${row.original.teamId}/orders/${row.original.id}`}
            >
              Detalle
            </Link>
          </Button>
        </div>
      );
    },
  },
]; 