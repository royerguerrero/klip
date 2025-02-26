import Heading from "../../_components/heading";
import CustomerForm from "./_components/customer-form";
import CustomersTable from "./_components/customers-table";
import { listCustomers } from "./_lib/data";

export default async function Page() {
  const customers = await listCustomers();

  return (
    <div className="py-2">
      <Heading title="Clientes">
        <CustomerForm modalTitle="Añadir Cliente" />
      </Heading>
      <CustomersTable customers={customers} />
    </div>
  );
}
