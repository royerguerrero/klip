"use client";

import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr";
import React, { useCallback } from "react";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const columns = [
  { name: "Cliente", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Teléfono", uid: "phone" },
  { name: "Fecha de ingreso", uid: "createdAt" },
];

export default function ClientsTable() {
  const customers: Customer[] = [
    {
      id: "1",
      firstName: "Maria",
      lastName: "Garcia",
      email: "maria@example.com",
      phone: "+57 300 123 4567",
      createdAt: new Date(),
    },
    {
      id: "2",
      firstName: "Juan",
      lastName: "Perez",
      email: "juan@example.com",
      phone: "+57 300 765 4321",
      createdAt: new Date(),
    },
  ];

  const renderCell = useCallback((customer: Customer, columnKey: React.Key) => {
    const cellValue = customer[columnKey as keyof Customer];

    switch (columnKey) {
      case "name":
        return (
          <span className="text-neutral-950 flex items-center gap-2 whitespace-nowrap font-medium">
            <Avatar
              classNames={{
                base: "bg-neutral-200",
                icon: "text-neutral-400",
              }}
              icon={<UserIcon size={14} weight="fill" />}
              className="w-6 h-6 text-tiny"
            />
            {customer.firstName} {customer.lastName}
          </span>
        );
      case "email":
      case "phone":
        return <span className="line-clamp-1">{`${cellValue}`}</span>;
      case "createdAt":
        return (
          <span className="line-clamp-1">
            {new Date(cellValue as Date).toLocaleDateString()}
          </span>
        );
      default:
        return `${cellValue}`;
    }
  }, []);

  return (
    <Table
      aria-label="Clients Table"
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
      <TableBody items={customers} emptyContent={"Aun no tienes clientes"}>
        {(item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell
                key={column.uid}
                className="font-medium text-neutral-400"
              >
                {renderCell(item, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
