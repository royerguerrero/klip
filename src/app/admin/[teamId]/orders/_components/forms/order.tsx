"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "./schemas";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/_components/ui/select";

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
      customer: initialData?.customer || "",
      service: initialData?.service || "",
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

        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del cliente</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Elije un cliente existente o crea uno nuevo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">Raw Alejandro</SelectItem>
                    <SelectItem value="m@google.com">Raw Alejandro</SelectItem>
                    <SelectItem value="m@support.com">Raw Alejandro</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servicio</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Elije el servicio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">Raw Alejandro</SelectItem>
                    <SelectItem value="m@google.com">Raw Alejandro</SelectItem>
                    <SelectItem value="m@support.com">Raw Alejandro</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
