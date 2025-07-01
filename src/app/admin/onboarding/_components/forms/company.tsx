"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "./schemas";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

interface CompanyFormProps {
  onNext: (data: z.infer<typeof companySchema>) => void;
  defaultValues?: z.infer<typeof companySchema>;
}

export default function CompanyForm({
  onNext,
  defaultValues,
}: CompanyFormProps) {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultValues || {
      companyName: "",
    },
  });

  const onSubmit = (data: z.infer<typeof companySchema>) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Nombre de la empresa *" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="w-full">
          Siguiente
        </Button>
      </form>
    </Form>
  );
}
