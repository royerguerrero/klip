"use server";

import { z } from "zod";
import { customerSchema } from "@/app/admin/[teamId]/customers/_components/forms/schemas";
import { CustomerEditor } from "@/contexts/customers/application/CustomerEditor";
import { DrizzleCustomerRepository } from "@/contexts/customers/infrastructure";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { redirect } from "next/navigation";

export default async function editCustomer(
  id: string,
  teamId: string,
  unsafeData: z.infer<typeof customerSchema>
) {
  const { success, data } = customerSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to edit a customer");

  const editor = new CustomerEditor(new DrizzleCustomerRepository(db));
  const { error, customer } = await editor.edit(id, {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: {
      prefix: data.phonePrefix,
      number: data.phone,
    },
    document: {
      type: data.documentType,
      value: data.documentNumber,
    },
    dateBirth: data.dob,
    teamId: teamId,
  });

  if (error || !customer) return error as Error;

  return redirect(`/admin/${teamId}/customers/${id}`);
}
