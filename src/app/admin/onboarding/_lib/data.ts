import { Step } from "@/app/_lib/types";

export function listOnboardingSteps(): Step[] {
  return [
    {
      title: "Nombre de la empresa",
      description: "Ingresa el nombre de tu empresa",
    },
    {
      title: "Equipo y miembros",
      description: "Configura tu equipo y agrega miembros",
    },
  ];
}
