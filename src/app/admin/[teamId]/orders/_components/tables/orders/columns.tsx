"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/app/admin/[teamId]/orders/_lib/types";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatOrderId } from "@/app/_lib/utils";

// Helper function to get payment status badge
const getPaymentStatusBadge = (status: string) => {
  const variants = {
    pending: "secondary",
    paid: "default",
    failed: "destructive",
    refunded: "outline",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status === "pending" && "Pendiente"}
      {status === "paid" && "Pagado"}
      {status === "failed" && "Fallido"}
      {status === "refunded" && "Reembolsado"}
    </Badge>
  );
};

// Helper function to get order status badge
const getOrderStatusBadge = (status: string) => {
  const variants = {
    pending: "secondary",
    confirmed: "default",
    completed: "default",
    cancelled: "destructive",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status === "pending" && "Pendiente"}
      {status === "confirmed" && "Confirmado"}
      {status === "completed" && "Completado"}
      {status === "cancelled" && "Cancelado"}
    </Badge>
  );
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Orden",
    cell: ({ row }) => {
      return (
        <span className="text-foreground">#{formatOrderId(row.original.id)}</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return format(date, "dd/MM/yyyy HH:mm", { locale: es });
    },
  },
  {
    accessorKey: "customer",
    header: "Cliente",
    cell: ({ row }) => {
      return <span>{row.original.customer.name}</span>;
    },
  },
  {
    accessorKey: "services",
    header: "Servicios",
    cell: ({ row }) => {
      return <span>{row.original.services.length} ⋅ 10 Sesiones</span>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      return (
        <span className="font-medium">${row.original.total.toFixed(2)}</span>
      );
    },
  },
  {
    accessorKey: "payment",
    header: "Estado de Pago",
    cell: ({ row }) => {
      return getPaymentStatusBadge(row.original.payment.status);
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return getOrderStatusBadge(row.original.status);
    },
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
