"use server";

import { CustomerArchiver } from "@/contexts/customers/application/CustomerArchiver";
import { DrizzleCustomerRepository } from "@/contexts/customers/infrastructure";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { redirect } from "next/navigation";

export default async function archiveCustomer(id: string, teamId: string) {
  const archiver = new CustomerArchiver(new DrizzleCustomerRepository(db));
  const { error, customer } = await archiver.archive(id);

  if (error || !customer) return error as Error;

  return redirect(`/admin/${teamId}/customers`);
}
