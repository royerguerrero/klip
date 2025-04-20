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
import { CustomerResponseDTO } from "@/contexts/backoffice/customer/application/CustomersResponse";
import React, { useCallback } from "react";
import { CustomerDetailDrawer } from "./customer-detail-drawer";

type Props = {
  customers: CustomerResponseDTO[];
};

const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Documento", uid: "identityDocument" },
  { name: "Fecha de ingreso", uid: "createdAt" },
  { name: "Acciones", uid: "actions" },
];

export default function CustomersTable({ customers }: Props) {
  const renderCell = useCallback(
    (customer: CustomerResponseDTO, columnKey: React.Key) => {
      const cellValue = customer[columnKey as keyof CustomerResponseDTO];

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
        case "identityDocument":
          return (
            <span className="line-clamp-1">
              {`${customer.identityDocument.type} ${customer.identityDocument.documentNumber}`}
            </span>
          );
        case "actions":
          return <CustomerDetailDrawer customer={customer} />;
        default:
          return (
            <span className="line-clamp-1">{cellValue?.toLocaleString()}</span>
          );
      }
    },
    []
  );

  return (
    <Table
      aria-label="Customers Table"
      className="px-3 pt-1"
      shadow="none"
      classNames={{
        wrapper: "bg-neutral-100 p-2",
        th: "h-6",
        td: [
          // changing the rows border radius
          "bg-white",
          // first
          "group-data-[first=true]/tr:first:rounded-tl-xl",
          "group-data-[first=true]/tr:last:rounded-tr-xl",
          // middle
          "group-data-[middle=true]/tr:before:rounded-none",
          // last
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
            align={column.uid === "actions" ? "end" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={customers} emptyContent={"Aun no tienes clientes"}>
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
