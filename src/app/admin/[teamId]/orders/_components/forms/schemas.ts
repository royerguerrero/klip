import { z } from "zod";

export const orderSchema = z.object({
  customerId: z.string().min(1, "El cliente es requerido"),
  serviceId: z.string().min(1, "El servicio es requerido"),
  onboardingId: z.string().min(1, "El onboarding es requerido"),
  externalInvoiceId: z.string().min(1, "El ID de factura externa es requerido"),
  paymentId: z.string().min(1, "El ID de pago es requerido"),
  externalReciptId: z.string().min(1, "El ID de recibo externo es requerido"),
});

export const archiveOrderSchema = z.object({
  id: z.string().min(1, { message: "El ID es requerido" }),
});

export type OrderFormData = z.infer<typeof orderSchema>; 