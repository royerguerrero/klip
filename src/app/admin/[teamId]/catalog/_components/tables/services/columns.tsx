"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/app/admin/[teamId]/catalog/_lib/types";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/app/_lib/utils";
import { Badge } from "@/app/_components/ui/badge";

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
    accessorKey: "status",
    header: "Estado",
    cell: () => {
      return <Badge variant="secondary">Borrador</Badge>;
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
