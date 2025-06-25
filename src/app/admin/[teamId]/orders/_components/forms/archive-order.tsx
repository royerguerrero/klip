"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { archiveOrderSchema } from "./schemas";
import { z } from "zod";

import { Form } from "@/app/_components/ui/form";
import { FormField } from "@/app/_components/ui/form";
import { FormItem } from "@/app/_components/ui/form";
import { FormControl } from "@/app/_components/ui/form";
import { FormMessage } from "@/app/_components/ui/form";
import { FormLabel } from "@/app/_components/ui/form";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { archiveOrder } from "../../_lib/actions";
import { Order } from "../../_lib/types";
import { Separator } from "@/app/_components/ui/separator";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import { Icon } from "@iconify-icon/react";
import { Heading } from "../../../_components/heading";

type ArchiveOrderData = z.infer<typeof archiveOrderSchema>;

type Props = {
  order: Order;
};

export default function ArchiveOrderForm({ order }: Props) {
  const form = useForm<ArchiveOrderData>({
    resolver: zodResolver(archiveOrderSchema),
    defaultValues: {
      id: "",
    },
  });

  const handleSubmit = async () => {
    await archiveOrder(order.id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Heading title="Archivar orden">
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
            Esta acción archiva permanentemente la orden. Lo cual significa
            que no podrás ver la información de la orden y esta eventualmente
            será eliminada por completo.
          </AlertDescription>
        </Alert>

        <Separator />

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Escribe{" "}
                <strong>{order.id}</strong>{" "}
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
          disabled={form.watch("id") !== order.id}
        >
          Entiendo las consecuencias de archivar esta orden
        </Button>
      </form>
    </Form>
  );
} 