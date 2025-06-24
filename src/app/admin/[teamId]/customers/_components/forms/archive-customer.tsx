"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { archiveCustomerSchema } from "./schemas";
import { z } from "zod";

import { Form } from "@/app/_components/ui/form";
import { FormField } from "@/app/_components/ui/form";
import { FormItem } from "@/app/_components/ui/form";
import { FormControl } from "@/app/_components/ui/form";
import { FormMessage } from "@/app/_components/ui/form";
import { FormLabel } from "@/app/_components/ui/form";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { archiveCustomer } from "../../_lib/actions";
import { Customer } from "../../_lib/types";
import { Separator } from "@/app/_components/ui/separator";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import { Icon } from "@iconify-icon/react";
import { Heading } from "../../../_components/heading";

type ArchiveCustomerData = z.infer<typeof archiveCustomerSchema>;

type Props = {
  customer: Customer;
};

export default function ArchiveCustomerForm({ customer }: Props) {
  const form = useForm<ArchiveCustomerData>({
    resolver: zodResolver(archiveCustomerSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async () => {
    await archiveCustomer(customer.id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Heading title="Archivar cliente">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </Heading>

        <Alert variant="default">
          <AlertTitle className="flex items-center gap-2">
            <Icon icon="ph:warning-fill" height={15} />
            <span>Antes de archivar, considera:</span>
          </AlertTitle>
          <AlertDescription>
            Esta acción archiva permanentemente al cliente. Lo cual significa
            que la no podras ver la información del usuario y esta eventualmente
            sera eliminada por completo.
          </AlertDescription>
        </Alert>

        <Separator />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Escribe{" "}
                <strong>
                  {customer.firstName} {customer.lastName}
                </strong>{" "}
                para confirmar
              </FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="destructive"
          className="w-full"
          size="lg"
          disabled={
            form.watch("name") !== `${customer.firstName} ${customer.lastName}`
          }
        >
          Entiendo las consecuencias de archivar este cliente
        </Button>
      </form>
    </Form>
  );
}
