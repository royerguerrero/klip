"use server";

import bootstrap from "@/app/admin/_lib/bootstrap";
import { RegisterCustomerCommand } from "@/contexts/backoffice/customer/application/register/RegisterCustomerCommand";

export async function createCustomer(formData: FormData) {
  const command = new RegisterCustomerCommand(
    formData.get("firstName") as string,
    formData.get("lastName") as string,
    formData.get("dob") as string,
    formData.get("phoneNumber") as string,
    "",
  );
  await bootstrap.commandBus.dispatch(command);

  return {};
}
