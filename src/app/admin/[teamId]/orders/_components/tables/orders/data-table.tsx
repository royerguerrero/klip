"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Icon } from "@iconify-icon/react";
import { cn } from "@/app/_lib/utils";
import { Order } from "@/app/admin/[teamId]/orders/_lib/types";
import { DataTableFacetedFilter } from "@/app/_components/ui/data-table-faceted-filter";

interface DataTableProps {
  data: Order[];
  columns: ColumnDef<Order>[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [showSearch, setShowSearch] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: (row, columnId, filterValue) => {
      const order = row.original;
      const searchableText = [
        order.customer.name,
        order.customer.email,
        order.customer.phone,
        order.status,
        order.payment.status,
        order.services.map((service) => service.name).join(" "),
        order.total.toString(),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(filterValue.toLowerCase());
    },
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
  });

  const paymentStatusOptions = [
    { label: "Pendiente", value: "pending" },
    { label: "Pagado", value: "paid" },
    { label: "Fallido", value: "failed" },
    { label: "Reembolsado", value: "refunded" },
  ];

  const orderStatusOptions = [
    { label: "Pendiente", value: "pending" },
    { label: "Confirmado", value: "confirmed" },
    { label: "Completado", value: "completed" },
    { label: "Cancelado", value: "cancelled" },
  ];

  return (
    <>
      <section className="flex flex-col gap-2 relative space-y-2">
        <div
          className={cn(
            "flex items-center justify-end relative",
            showSearch ? "block" : "hidden"
          )}
        >
          <Input
            placeholder="Buscar por cliente, email, teléfono, estado, servicios..."
            className="h-9 pl-9 rounded-lg"
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
          <Icon
            icon="ph:magnifying-glass-bold"
            height={16}
            className="absolute top-2.5 left-2.5 text-muted-foreground"
          />
        </div>
        <div className={cn("gap-2", showFilters ? "flex" : "hidden")}>
          <DataTableFacetedFilter
            column={table.getColumn("payment")}
            title="Estado de Pago"
            options={paymentStatusOptions}
          />
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Progreso"
            options={orderStatusOptions}
          />
          <Button
            variant="ghost"
            className="text-muted-foreground h-7 px-2"
            onClick={() => {
              setGlobalFilter("");
              setColumnFilters([]);
              table.resetColumnFilters();
            }}
          >
            <Icon icon="ph:x-bold" height={14} />
            Reiniciar filtros
          </Button>
        </div>
        <div className="flex items-center justify-end px-3 absolute -bottom-8.5 right-0 z-10 gap-1">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Icon icon="ph:funnel-simple-bold" height={14} />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Icon icon="ph:magnifying-glass-bold" height={14} />
          </Button>
        </div>
      </section>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay Ordenes registradas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 mt-2 px-1.5">
        <Button
          size="icon"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Icon icon="ph:caret-left-bold" height={14} />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Icon icon="ph:caret-right-bold" height={14} />
        </Button>
      </div>
    </>
  );
}
