import Heading from "../../_components/heading";
import CustomerForm from "./_components/customer-form";
import CustomersTable from "./_components/customers-table";
import { listCustomers } from "./_lib/data";

export default async function Page() {
  const customers = await listCustomers();

  return (
    <>
      <Heading title="Clientes">
        <CustomerForm />
      </Heading>
      <CustomersTable customers={customers} />
    </>
  );
}
