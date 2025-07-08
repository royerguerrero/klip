import { z } from "zod";

export const orderSchema = z.object({
  customer: z.string().min(1, "El cliente es requerido"),
  service: z.string().min(1, "El servicio es requerido"),
});

export const archiveOrderSchema = z.object({
  id: z.string().min(1, { message: "El ID es requerido" }),
});

export type OrderFormData = z.infer<typeof orderSchema>; 