"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/app/admin/[teamId]/customers/_lib/types";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

export const createColumns = (teamId: string): ColumnDef<Customer>[] => [
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
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button variant="secondary" asChild>
            <Link
              href={`/admin/${teamId}/customers/${row.original.id}`}
            >
              Detalle
            </Link>
          </Button>
        </div>
      );
    },
  },
];
