import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  price: z.number().min(0, { message: "El precio debe ser mayor a 0" }),
  currency: z.string().min(1, { message: "La moneda es requerida" }),
}); 