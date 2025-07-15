import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  price: z.number().min(0, { message: "El precio debe ser mayor a 0" }),
  currency: z.string().min(1, { message: "La moneda es requerida" }),
  sessions: z.number().min(1, { message: "El número de sesiones debe ser mayor a 0" }),
  sessionDuration: z.number().min(30, { message: "La duración debe ser al menos 30 minutos" }),
});

export const questionSchema = z.object({
  label: z.string().min(1, { message: "La pregunta es requerida" }),
  inputType: z.enum(["name", "short text", "long text", "date", "select", "email", "phone"]),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});
