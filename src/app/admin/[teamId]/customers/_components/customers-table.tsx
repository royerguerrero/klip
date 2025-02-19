"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { CustomerResponseDTO } from "@/contexts/backoffice/customer/application/CustomersResponse";

type Props = {
  customers: CustomerResponseDTO[];
};

export default function CustomersTable({ customers }: Props) {
  return (
    <Table aria-label="Customers Table" className="px-3 pt-1" shadow="none">
      <TableHeader>
        <TableColumn className="uppercase font-medium tracking-wide">
          Nombre
        </TableColumn>
        {/* <TableColumn className="uppercase font-medium tracking-wide">
          Numero telefónico
        </TableColumn> */}
      </TableHeader>
      <TableBody emptyContent={"Aun no tienes clientes"}>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
