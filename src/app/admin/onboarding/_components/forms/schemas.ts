import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(1, "El nombre de la empresa es requerido"),
});

export const teamSchema = z.object({
  team: z.object({
    name: z.string().min(1, "El nombre del equipo es requerido"),
    members: z.array(
      z.object({
        email: z.string().email("Email inválido"),
        role: z.enum(["admin", "staff"]),
      })
    ),
  }),
});
