"use server";

import bootstrap from "@/app/admin/_lib/bootstrap";
import { auth } from "@/app/auth";
import { RegisterCustomerCommand } from "@/contexts/backoffice/customer/application/register/RegisterCustomerCommand";
import { CustomerId } from "@/contexts/backoffice/customer/domain/CustomerId";

export async function createCustomer(formData: FormData) {
  const session = auth();

  const command = new RegisterCustomerCommand(
    CustomerId.nextId().value,
    formData.get("firstName") as string,
    formData.get("lastName") as string,
    formData.get("dob") as string,
    "",
    "",
    formData.get("phoneNumber") as string,
    ""
  );
  await bootstrap.commandBus.dispatch(command);

  return {};
}
