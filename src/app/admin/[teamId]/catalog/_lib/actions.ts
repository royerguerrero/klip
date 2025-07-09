"use server";

import { z } from "zod";
import { serviceSchema } from "@/app/admin/[teamId]/catalog/_components/forms/schemas";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { redirect } from "next/navigation";
import { ServiceCreator } from "@/contexts/services/application/ServiceCreator";
import { ServiceEditor } from "@/contexts/services/application/ServiceEditor";
import { ServiceArchiver } from "@/contexts/services/application/ServiceArchiver";
import { DrizzleServiceRepository } from "@/contexts/services/infrastructure/persistence/drizzle/DrizzleServiceRepository";
import { ServiceId } from "@/contexts/services/domain/ServiceId";

export async function createService(
  unsafeData: z.infer<typeof serviceSchema>,
  teamId: string,
  nextTo: string = `/admin/${teamId}/catalog`
) {
  const { success, data } = serviceSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to add a service");

  const creator = new ServiceCreator(new DrizzleServiceRepository(db));
  const { error, service } = await creator.create({
    id: ServiceId.nextId().value,
    name: data.name,
    description: data.description,
    category: null,
    subcategory: null,
    sessions: {
      amount: 1,
      duration: 60,
    },
    price: {
      amount: data.price,
      currency: data.currency as "USD" | "EUR" | "COP",
    },
    teamId: teamId,
  });
  console.error(error);

  if (error || !service) return error as Error;

  redirect(nextTo);
}

export async function editService(
  id: string,
  teamId: string,
  unsafeData: z.infer<typeof serviceSchema>
) {
  const { success, data } = serviceSchema.safeParse(unsafeData);
  if (!success) return new Error("Unable to edit a service");

  const editor = new ServiceEditor(new DrizzleServiceRepository(db));
  const { error, service } = await editor.edit(id, {
    name: data.name,
    description: data.description,
    price: {
      amount: data.price,
      currency: data.currency as "USD" | "EUR" | "COP",
    },
    teamId: teamId,
  });

  if (error || !service) return error as Error;

  return redirect(`/admin/${teamId}/catalog/${id}`);
}

export async function archiveService(id: string, teamId: string) {
  const archiver = new ServiceArchiver(new DrizzleServiceRepository(db));
  const { error, service } = await archiver.archive(id);

  if (error || !service) return error as Error;

  return redirect(`/admin/${teamId}/catalog`);
}
