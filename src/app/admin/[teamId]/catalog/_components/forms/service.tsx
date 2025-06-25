"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "./schemas";
import { z } from "zod";

import { Form } from "@/app/_components/ui/form";
import { FormField } from "@/app/_components/ui/form";
import { FormItem } from "@/app/_components/ui/form";
import { FormControl } from "@/app/_components/ui/form";
import { FormMessage } from "@/app/_components/ui/form";
import { FormLabel } from "@/app/_components/ui/form";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";

import { useCurrentSession } from "@/app/admin/_contexts/current-session";
import { Heading } from "../../../_components/heading";
import { formatPrice } from "@/app/_lib/utils";

type ServiceData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  mode?: "create" | "edit";
  initialData?: Partial<ServiceData>;
}

export default function ServiceForm({
  mode = "create",
  initialData,
}: ServiceFormProps) {
  const { session } = useCurrentSession();
  const form = useForm<ServiceData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      currency: initialData?.currency || session.organization.country.currency,
    },
  });

  const handleSubmit = async (data: ServiceData) => {
    console.log(data);
    // TODO: Implement service creation/update logic based on mode
    if (mode === "create") {
      // Handle service creation
      console.log("Creating service:", data);
    } else {
      // Handle service update
      console.log("Updating service:", data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Heading
          title={mode === "create" ? "Añadir servicio" : "Editar servicio"}
        >
          <Button type="submit" variant="secondary">
            {mode === "create" ? "Guardar" : "Actualizar"}
          </Button>
        </Heading>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del servicio</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ej: Corte de cabello" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe el servicio..."
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  value={formatPrice(field.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Remove currency symbol, commas and any non-numeric characters
                    const numericValue = value.replace(/[^0-9]/g, "");
                    field.onChange(Number(numericValue));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
