import { Suspense } from "react";
import Heading from "../../_components/heading";
import CreateCustomerModal from "./_components/create-customer-modal";

import CustomersTable from "./_components/customers-table";
import { listCustomers } from "./_lib/data";
import { Button, Skeleton } from "@heroui/react";

export default async function Page() {
  const customers = await listCustomers();

  if (customers == null) {
    return "unauthorized";
  }

  return (
    <div className="h-full">
      <Heading title="Clientes">
        <CreateCustomerModal
          trigger={
            <Button
              variant="flat"
              color="primary"
              size="sm"
              className="text-sm tracking-tight font-medium"
            >
              Añadir Cliente
            </Button>
          }
        />
      </Heading>
      <Suspense
        fallback={
          <section className="px-3 h-full w-full">
            <Skeleton className="w-full h-[600px] rounded-xl" />
          </section>
        }
      >
        <CustomersTable customers={customers} />;
      </Suspense>
    </div>
  );
}
