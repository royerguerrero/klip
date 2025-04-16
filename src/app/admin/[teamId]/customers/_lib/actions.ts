"use server";

import bootstrap from "@/app/admin/_lib/bootstrap";
import { auth } from "@/app/auth";
import { EditCustomerCommand } from "@/contexts/backoffice/customer/application/edit/EditCustomerCommand";
import { RegisterCustomerCommand } from "@/contexts/backoffice/customer/application/register/RegisterCustomerCommand";
import { CustomerId } from "@/contexts/backoffice/customer/domain/CustomerId";
import { PhoneNumberAlreadyInUse } from "@/contexts/shared/domain/errors/PhoneNumberAlreadyInUse";
import { PhoneNumberIsNotValid } from "@/contexts/shared/domain/errors/PhoneNumberIsNotValid";
import { CustomerIdentityDocumentAlreadyExists } from "@/contexts/backoffice/customer/domain/errors/CustomerIdentityDocumentAlreadyExists";

export async function createCustomer(formData: FormData) {
  const errors: { [key: string]: string } = {};
  const session = await auth();
  if (!session?.user) return { errors };

  try {
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
  } catch (error) {
    switch (true) {
      case error instanceof PhoneNumberIsNotValid:
        errors.phoneNumber = "El numero de teléfono no es valido";
        break;
      case error instanceof PhoneNumberAlreadyInUse:
        errors.phoneNumber = "El numero de teléfono ya esta en uso";
        break;
      case error instanceof CustomerIdentityDocumentAlreadyExists:
        errors.identityDocumentNumber = "El numero de documento ya esta en uso";
        break;
      default:
        throw error;
    }
  }

  return errors;
}

export async function editCustomer(customerId: string, formData: FormData) {
  const errors: { [key: string]: string } = {};
  const session = await auth();
  if (!session?.user) return { errors };

  try {
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
  } catch (error) {
    switch (true) {
      case error instanceof PhoneNumberIsNotValid:
        errors.phoneNumber = "El numero de teléfono no es valido";
        break;
      case error instanceof PhoneNumberAlreadyInUse:
        errors.phoneNumber = "El numero de teléfono ya esta en uso";
        break;
      case error instanceof CustomerIdentityDocumentAlreadyExists:
        errors.identityDocumentNumber = "El numero de documento ya esta en uso";
        break;
      default:
        throw error;
    }
  }

  console.log("editCustomer errors >>>>", errors);

  return errors;
}
