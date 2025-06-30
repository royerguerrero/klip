import { z } from "zod";

export const customerSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es requerido" }),
  lastName: z.string().min(1, { message: "El apellido es requerido" }),
  documentType: z
    .string()
    .min(1, { message: "El tipo de documento es requerido" }),
  documentNumber: z
    .string()
    .min(1, { message: "El número de documento es requerido" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  phonePrefix: z
    .string()
    .min(1, { message: "El prefijo telefónico es requerido" }),
  phone: z.string().min(1, { message: "El número de teléfono es requerido" }),
  dob: z.date({ required_error: "La fecha de nacimiento es requerida" }),
});

export const archiveCustomerSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
});
