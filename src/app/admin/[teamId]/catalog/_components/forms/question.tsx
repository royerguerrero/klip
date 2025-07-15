"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema } from "./schemas";
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
import { Switch } from "@/app/_components/ui/switch";

type QuestionData = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  initialData?: Partial<QuestionData>;
  onSave: (data: QuestionData) => void;
}

export default function QuestionForm({
  initialData,
  onSave,
}: QuestionFormProps) {
  const form = useForm<QuestionData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      label: initialData?.label || "",
      inputType: initialData?.inputType || "short text",
      required: initialData?.required || false,
      options: initialData?.options || [],
    },
  });

  const onSubmit = async (data: QuestionData) => {
    onSave(data);
  };

  const inputTypeOptions = [
    { value: "name", label: "Nombre" },
    { value: "short text", label: "Texto corto" },
    { value: "long text", label: "Texto largo" },
    { value: "date", label: "Fecha" },
    { value: "select", label: "Selección" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Teléfono" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pregunta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la pregunta" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inputType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de entrada</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {inputTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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
          name="required"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between gap-3">
              <FormLabel>Campo requerido</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("inputType") === "select" && (
          <FormField
            control={form.control}
            name="options"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opciones</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value?.join("\n") || ""}
                    onChange={(e) => {
                      const options = e.target.value
                        .split("\n")
                        .filter((option) => option.trim());
                      field.onChange(options);
                    }}
                    placeholder="Ingresa las opciones, una por línea"
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="outline">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}
