"use server";

import bootstrap from "@/app/admin/_lib/bootstrap";
import { auth } from "@/app/auth";
import { EditCustomerCommand } from "@/contexts/backoffice/customer/application/edit/EditCustomerCommand";
import { RegisterCustomerCommand } from "@/contexts/backoffice/customer/application/register/RegisterCustomerCommand";
import { CustomerId } from "@/contexts/backoffice/customer/domain/CustomerId";

export async function createCustomer(formData: FormData) {
  const session = await auth();
  if (!session?.user) return null;

  const command = new RegisterCustomerCommand(
    CustomerId.nextId().value,
    formData.get("firstName") as string,
    formData.get("lastName") as string,
    formData.get("dob") as string,
    formData.get("identityDocumentType") as string,
    formData.get("identityDocumentNumber") as string,
    `${formData.get("prefix")} ${formData.get("phoneNumber")}`,
    session.user.companyId,
  );
  await bootstrap.commandBus.dispatch(command);
}

export async function editCustomer(customerId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) return null;

  const command = new EditCustomerCommand(
    customerId,
    formData.get("firstName") as string,
    formData.get("lastName") as string,
    formData.get("dob") as string,
    formData.get("identityDocumentType") as string,
    formData.get("identityDocumentNumber") as string,
    `${formData.get("prefix")} ${formData.get("phoneNumber")}`,
    session.user.companyId,
  );
  await bootstrap.commandBus.dispatch(command);
}
