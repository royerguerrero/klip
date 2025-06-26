"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/app/admin/[teamId]/customers/_lib/types";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <span className="capitalize text-foreground">
          {`${row.original.firstName} ${row.original.lastName}`}
        </span>
      );
    },
  },
  {
    accessorKey: "document",
    header: "Documento",
    cell: ({ row }) => {
      return `${row.original.document.type} ${row.original.document.number}`;
    },
    filterFn: (row, id, value) => {
      const documentType = row.original.document.type;
      return value.includes(documentType);
    },
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    cell: ({ row }) => {
      return `${row.original.phone.prefix} ${row.original.phone.number}`;
    },
    filterFn: (row, id, value) => {
      const phonePrefix = row.original.phone.prefix;
      return value.includes(phonePrefix);
    },
  },
  {
    accessorKey: "addedAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Fecha de ingreso
          <Button
            variant="ghost"
            size="icon"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Icon icon="ph:sort-ascending" className="size-4" />
          </Button>
        </div>
      );
    },
    cell: () => {
      return <span>{new Date().toLocaleDateString()}</span>;
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
              href={`/admin/${row.original.teamId}/customers/${row.original.id}`}
            >
              Detalle
            </Link>
          </Button>
        </div>
      );
    },
  },
];
