"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderFormData } from "./schemas";
import { z } from "zod";

import { Form } from "@/app/_components/ui/form";
import { FormField } from "@/app/_components/ui/form";
import { FormItem } from "@/app/_components/ui/form";
import { FormControl } from "@/app/_components/ui/form";
import { FormMessage } from "@/app/_components/ui/form";
import { FormLabel } from "@/app/_components/ui/form";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { addOrder, editOrder } from "@/app/admin/[teamId]/orders/_lib/actions";
import { useRouter } from "next/navigation";
import { Heading } from "../../../_components/heading";

type OrderData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  mode?: "create" | "edit";
  initialData?: Partial<OrderData> & { id?: string };
  teamId: string;
}

export default function OrderForm({
  mode = "create",
  initialData,
  teamId,
}: OrderFormProps) {
  const router = useRouter();
  const form = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerId: initialData?.customerId || "",
      serviceId: initialData?.serviceId || "",
      onboardingId: initialData?.onboardingId || "",
      externalInvoiceId: initialData?.externalInvoiceId || "",
      paymentId: initialData?.paymentId || "",
      externalReciptId: initialData?.externalReciptId || "",
    },
  });

  const handleSubmit = async (data: OrderData) => {
    try {
      if (mode === "edit" && initialData) {
        await editOrder(initialData.id || "", data);
      } else {
        await addOrder(data);
      }
      router.push(`/admin/${teamId}/orders`);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Heading title={mode === "create" ? "Añadir orden" : "Editar orden"}>
          <Button type="submit" variant="secondary">
            {mode === "create" ? "Guardar" : "Actualizar"}
          </Button>
        </Heading>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ID del cliente" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servicio ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ID del servicio" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="onboardingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Onboarding ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ID del onboarding" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="externalInvoiceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Factura Externa ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ID de la factura externa" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pago ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ID del pago" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="externalReciptId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recibo Externo ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ID del recibo externo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
} 