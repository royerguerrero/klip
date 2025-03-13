import Heading from "../../_components/heading";
import CreateCustomerModal from "./_components/create-customer-modal";

import CustomersTable from "./_components/customers-table";
import { listCustomers } from "./_lib/data";

export default async function Page() {
  const customers = await listCustomers();

  return (
    <div className="py-2">
      <Heading title="Clientes">
        <CreateCustomerModal />
      </Heading>
      {customers != null ? (
        <CustomersTable customers={customers} />
      ) : (
        "unauthorized"
      )}
    </div>
  );
}
