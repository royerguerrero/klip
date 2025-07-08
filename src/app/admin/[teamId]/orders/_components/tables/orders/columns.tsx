"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/app/admin/[teamId]/orders/_lib/types";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatOrderId } from "@/app/_lib/utils";
import { Icon } from "@iconify-icon/react";

// Helper function to get payment status badge
const getPaymentStatusBadge = (status: string) => {
  const variants = {
    pending: "warning",
    paid: "success",
    failed: "destructive",
    refunded: "secondary",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status === "pending" && <Icon icon="ph:spinner-gap-bold" height={14} />}
      {status === "paid" && <Icon icon="ph:seal-check-fill" height={12} />}
      {status === "failed" && <Icon icon="ph:spinner-gap-bold" height={14} />}
      {status === "refunded" && <Icon icon="ph:spinner-gap-bold" height={14} />}
      {status === "pending" && "Pago pendiente"}
      {status === "paid" && "Pagado"}
      {status === "failed" && "Fallido"}
      {status === "refunded" && "Reembolsado"}
    </Badge>
  );
};

// Helper function to get order status badge
const getOrderStatusBadge = (status: string) => {
  const variants = {
    pending: "warning",
    confirmed: "success",
    completed: "success",
    cancelled: "destructive",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status === "pending" && <Icon icon="ph:spinner-gap-bold" height={16} />}
      {status === "confirmed" && <Icon icon="ph:check-circle-fill" height={16} />}
      {status === "completed" && <Icon icon="ph:check-circle-fill" height={16} />}
      {status === "cancelled" && <Icon icon="ph:x-circle-fill" height={16} />}
      {status === "pending" && "Pendiente (1/10)"}
      {status === "confirmed" && "Confirmada"}
      {status === "completed" && "Completada"}
      {status === "cancelled" && "Cancelada"}
    </Badge>
  );
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Orden",
    cell: ({ row }) => {
      return (
        <span className="text-foreground">
          #{formatOrderId(row.original.id)}
        </span>
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
    header: "Progreso",
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
