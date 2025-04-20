"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Receipt } from "@phosphor-icons/react/dist/ssr";
import React, { useCallback } from "react";

interface Transaction {
  id: string;
  service: string;
  amount: number;
  date: Date;
  status: "completed" | "pending" | "cancelled";
}

const columns = [
  { name: "Servicio", uid: "service" },
  { name: "Monto", uid: "amount" },
  { name: "Fecha", uid: "date" },
  { name: "Estado", uid: "status" },
];

export default function TransactionsTable() {
  const transactions: Transaction[] = [
    {
      id: "1",
      service: "Corte de cabello tradicional",
      amount: 25000,
      date: new Date(),
      status: "completed",
    },
    {
      id: "2",
      service: "Clase de pilates grupal",
      amount: 80000,
      date: new Date(),
      status: "completed",
    },
  ];

  const renderCell = useCallback((transaction: Transaction, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof Transaction];

    switch (columnKey) {
      case "service":
        return (
          <span className="text-neutral-950 flex items-center gap-2 whitespace-nowrap font-medium">
            <Receipt size={16} weight="fill" className="text-neutral-400" />
            {transaction.service}
          </span>
        );
      case "amount":
        return (
          <span className="text-lime-500 font-semibold">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(transaction.amount)}
          </span>
        );
      case "date":
        return (
          <span className="line-clamp-1">
            {new Date(cellValue as Date).toLocaleDateString()}
          </span>
        );
      case "status":
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            transaction.status === "completed" ? "bg-lime-100 text-lime-700" :
            transaction.status === "pending" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"
          }`}>
            {transaction.status === "completed" ? "Completado" :
             transaction.status === "pending" ? "Pendiente" :
             "Cancelado"}
          </span>
        );
      default:
        return `${cellValue}`;
    }
  }, []);

  return (
    <Table
      aria-label="Transactions Table"
      shadow="none"
      classNames={{
        wrapper: "bg-neutral-100 p-2",
        th: "h-6",
        td: [
          "bg-white",
          "group-data-[first=true]/tr:first:rounded-tl-xl",
          "group-data-[first=true]/tr:last:rounded-tr-xl",
          "group-data-[middle=true]/tr:before:rounded-none",
          "group-data-[last=true]/tr:first:rounded-bl-xl",
          "group-data-[last=true]/tr:last:rounded-br-xl",
        ],
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            className="uppercase tracking-wide"
            key={column.uid}
            align="start"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={transactions} emptyContent={"No hay transacciones"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="font-medium text-neutral-400">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
