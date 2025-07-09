"use server";

import { z } from "zod";
import { customerSchema } from "@/app/admin/[teamId]/customers/_components/forms/schemas";
import { CustomerAdder } from "@/contexts/customers/application/CustomerAdder";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { DrizzleCustomerRepository } from "@/contexts/customers/infrastructure/persistence/DrizzleCustomerRepository";
import { CustomerId } from "@/contexts/customers/domain/CustomerId";
import { redirect } from "next/navigation";
import { CustomerArchiver } from "@/contexts/customers/application/CustomerArchiver";
import { CustomerEditor } from "@/contexts/customers/application/CustomerEditor";

export async function addCustomer(
  unsafeData: z.infer<typeof customerSchema>,
  teamId: string,
  nextTo: string = `/admin/${teamId}/customers`
) {
  const { success, data } = customerSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to add a customer");

  const adder = new CustomerAdder(new DrizzleCustomerRepository(db));
  const { error, customer } = await adder.add({
    id: CustomerId.nextId().value,
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

  redirect(nextTo);
}

export async function editCustomer(
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

export async function archiveCustomer(id: string, teamId: string) {
  const archiver = new CustomerArchiver(new DrizzleCustomerRepository(db));
  const { error, customer } = await archiver.archive(id);

  if (error || !customer) return error as Error;

  return redirect(`/admin/${teamId}/customers`);
}
