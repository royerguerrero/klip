"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "./schemas";
import { z } from "zod";
import { format } from "date-fns";

import { Form } from "@/app/_components/ui/form";
import { FormField } from "@/app/_components/ui/form";
import { FormItem } from "@/app/_components/ui/form";
import { FormControl } from "@/app/_components/ui/form";
import { FormMessage } from "@/app/_components/ui/form";
import { FormLabel } from "@/app/_components/ui/form";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/app/_lib/utils";

import { useCurrentSession } from "@/app/admin/_contexts/current-session";
import { countries } from "@/app/admin/_lib/countries";
import { es } from "date-fns/locale";
import { Icon } from "@iconify-icon/react";
import { Heading } from "../../../_components/heading";

type CustomerData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  mode?: "create" | "edit";
  initialData?: Partial<CustomerData>;
}

export default function CustomerForm({
  mode = "create",
  initialData,
}: CustomerFormProps) {
  const { session } = useCurrentSession();
  const form = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      documentType: initialData?.documentType || "",
      documentNumber: initialData?.documentNumber || "",
      email: initialData?.email || "",
      phonePrefix:
        initialData?.phonePrefix || session.organization.country.code,
      phone: initialData?.phone || "",
      dob: initialData?.dob || undefined,
    },
  });

  const handleSubmit = async (data: CustomerData) => {
    console.log(data);
    // TODO: Implement customer creation/update logic based on mode
    if (mode === "create") {
      // Handle customer creation
      console.log("Creating customer:", data);
    } else {
      // Handle customer update
      console.log("Updating customer:", data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Heading title={mode === "create" ? "Añadir cliente" : "Editar cliente"}>
          <Button type="submit" variant="secondary">
            {mode === "create" ? "Guardar" : "Actualizar"}
          </Button>
        </Heading>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nombre" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Apellido" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 items-end">
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de documento</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-60">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries
                      .get(session.organization.country.code)
                      ?.documentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Número de documento</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Número de documento" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {(form.formState.errors.documentType ||
          form.formState.errors.documentNumber) && (
          <FormMessage>
            {form.formState.errors.documentType?.message ||
              form.formState.errors.documentNumber?.message}
          </FormMessage>
        )}

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de nacimiento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className={cn(
                        "font-normal h-10 tracking-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                      <Icon icon="ph-cake" className="ml-auto" height={16} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    locale={es}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="correo@ejemplo.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 items-end">
          <FormField
            control={form.control}
            name="phonePrefix"
            render={({ field }) => (
              <FormItem className="w-32">
                <FormLabel>Teléfono</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {field.value && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={countries.get(field.value)?.flag}
                                className="object-cover"
                                alt="Country flag"
                              />
                            </Avatar>
                            <span>{countries.get(field.value)?.prefix}</span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from(countries.values()).map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-4 w-4">
                            <AvatarImage
                              src={country.flag}
                              className="object-cover"
                              alt={`${country.name} flag`}
                            />
                            <AvatarFallback className="text-xs">
                              {country.code}
                            </AvatarFallback>
                          </Avatar>
                          <span>{country.prefix}</span>
                          <span className="text-muted-foreground">
                            {country.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Número de teléfono" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {(form.formState.errors.phonePrefix || form.formState.errors.phone) && (
          <FormMessage>
            {form.formState.errors.phonePrefix?.message ||
              form.formState.errors.phone?.message}
          </FormMessage>
        )}
      </form>
    </Form>
  );
}
