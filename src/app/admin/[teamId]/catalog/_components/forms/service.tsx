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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

import { useCurrentSession } from "@/app/admin/_contexts/current-session";
import { Heading } from "../../../_components/heading";
import { formatPrice } from "@/app/_lib/utils";
import { ServiceCreator } from "@/contexts/services/application/ServiceCreator";
import { createService } from "../../_lib/actions";

type ServiceData = z.infer<typeof serviceSchema>;

type Props = {
  mode?: "create" | "edit";
  initialData?: Partial<ServiceData>;
};

export default function ServiceForm({ mode = "create", initialData }: Props) {
  const { session } = useCurrentSession();
  const form = useForm<ServiceData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      currency: initialData?.currency || session.organization.country.currency,
      sessions: initialData?.sessions || undefined,
      sessionDuration: initialData?.sessionDuration || undefined,
    },
  });

  const onSubmit = async (data: ServiceData) => {
    if (mode === "create") {
      const error = await createService(
        data,
        session.organization.currentTeam.id
      );
      if (error) {
        form.setError("root", {
          message: "Error al crear el servicio",
        });
      }
    } else {
      // Handle service update
      console.log("Updating service:", data);
    }
  };

  const sessionOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const durationOptions = Array.from({ length: 48 }, (_, i) => (i + 1) * 30);

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = minutes / 60;
      const formatter = new Intl.NumberFormat("es-US", {
        style: "unit",
        unit: "hour",
        unitDisplay: "long",
      });
      return formatter.format(hours);
    }
    const formatter = new Intl.NumberFormat("es-US", {
      style: "unit",
      unit: "minute",
      unitDisplay: "long",
    });
    return formatter.format(minutes);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Heading
          title={mode === "create" ? "Añadir servicio" : "Editar servicio"}
        >
          <Button type="submit" variant="secondary">
            Guardar
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

        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="sessions"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sesiones</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString() || ""}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Cantidad de sesiones" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sessionOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option} {option === 1 ? "sesión" : "sesiones"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sessionDuration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Duración</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString() || ""}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Duración por sesión" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {durationOptions.map((minutes) => (
                      <SelectItem key={minutes} value={minutes.toString()}>
                        {formatDuration(minutes)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
