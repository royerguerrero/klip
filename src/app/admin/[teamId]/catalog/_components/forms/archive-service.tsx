"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/app/_components/ui/form";
import { FormField } from "@/app/_components/ui/form";
import { FormItem } from "@/app/_components/ui/form";
import { FormControl } from "@/app/_components/ui/form";
import { FormMessage } from "@/app/_components/ui/form";
import { FormLabel } from "@/app/_components/ui/form";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import { Icon } from "@iconify-icon/react";
import { Heading } from "../../../_components/heading";

const archiveServiceSchema = z.object({
  name: z.string().min(1, "Debes escribir el nombre del servicio"),
});

type ArchiveServiceData = z.infer<typeof archiveServiceSchema>;

type Props = {
  service: {
    id: string;
    name: string;
  };
};

export default function ArchiveServiceForm({ service }: Props) {
  const form = useForm<ArchiveServiceData>({
    resolver: zodResolver(archiveServiceSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async () => {
    // TODO: Implement archive service action
    console.log("Archiving service:", service.id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Heading title="Archivar servicio">
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
            Esta acción archiva permanentemente el servicio. Lo cual significa
            que no podrás ver la información del servicio y esta eventualmente
            será eliminada por completo.
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
                <strong>{service.name}</strong>{" "}
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
          disabled={form.watch("name") !== service.name}
        >
          Entiendo las consecuencias de archivar este servicio
        </Button>
      </form>
    </Form>
  );
} 