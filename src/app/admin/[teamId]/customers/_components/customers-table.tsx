"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@heroui/react";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr";
import { CustomerResponseDTO } from "@/contexts/backoffice/customer/application/CustomersResponse";
import React, { useCallback } from "react";

type Props = {
  customers: CustomerResponseDTO[];
};

const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Acciones", uid: "actions" },
];

export default function CustomersTable({ customers }: Props) {
  const renderCell = useCallback(
    (customer: CustomerResponseDTO, columnKey: React.Key) => {
      const cellValue = customer[columnKey as keyof CustomerResponseDTO];

      switch (columnKey) {
        case "name":
          return (
            <User
              classNames={{
                name: "font-semibold tracking-tight",
                description: "font-semibold",
              }}
              avatarProps={{
                classNames: {
                  base: "bg-neutral-200",
                  icon: "text-neutral-400",
                },
                radius: "lg",
                icon: <UserIcon size={20} weight="fill" />,
              }}
              description={customer.identityDocument}
              name={customer.name}
            />
          );
        case "actions":
          return (
            <Button
              size="sm"
              variant="flat"
              radius="full"
              className="text-sm tracking-tight font-medium"
            >
              Editar
            </Button>
          );
        default:
          return cellValue;
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
      <TableBody items={customers}>
        {(item) => (
          <TableRow key={item.id} className="rounded-lg">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
