"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/app/admin/[teamId]/catalog/_lib/types";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/app/_lib/utils";
import { Badge } from "@/app/_components/ui/badge";
import { Icon } from "@iconify-icon/react";

const getServiceStatusBadge = (status: string) => {
  const variants = {
    draft: "default",
    published: "success",
    archived: "warning",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status === "draft" && <Icon icon="ph:circle-dashed-bold" height={14} />}
      {status === "published" && (
        <Icon icon="ph:globe-simple-fill" height={14} />
      )}
      {status === "archived" && (
        <Icon icon="ph:globe-simple-x-bold" height={14} />
      )}
      {status === "draft" && "Borrador"}
      {status === "published" && "Publicado"}
      {status === "archived" && "Archivado"}
    </Badge>
  );
};

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Servicio",
    cell: ({ row }) => {
      return (
        <span className="capitalize text-foreground">{row.original.name}</span>
      );
    },
  },

  {
    accessorKey: "sessions",
    header: "Sesiones",
    cell: ({ row }) => {
      const { amount, duration } = row.original.sessions;
      const durationLabel = new Intl.NumberFormat("es-US", {
        style: "unit",
        unit: duration < 60 ? "minute" : "hour",
        unitDisplay: "long",
      }).format(duration < 60 ? duration : duration / 60);
      return (
        <span>
          {amount} sesiones ⋅ {durationLabel} / sesión
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {formatPrice(row.original.price.amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return getServiceStatusBadge(row.original.status);
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
              href={`/admin/${row.original.teamId}/catalog/${row.original.id}`}
            >
              Detalle
            </Link>
          </Button>
        </div>
      );
    },
  },
];
