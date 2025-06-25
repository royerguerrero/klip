import { Service } from "./types";

export const categories = [
  { value: "belleza", label: "Belleza" },
  { value: "salud", label: "Salud" },
  { value: "bienestar", label: "Bienestar" },
  { value: "otros", label: "Otros" },
];

export const subcategories = {
  belleza: [
    { value: "corte", label: "Corte" },
    { value: "coloracion", label: "Coloración" },
    { value: "manicure", label: "Manicure" },
    { value: "pedicure", label: "Pedicure" },
    { value: "tratamiento", label: "Tratamiento" },
  ],
  salud: [
    { value: "consulta", label: "Consulta" },
    { value: "terapia", label: "Terapia" },
    { value: "masaje", label: "Masaje" },
  ],
  bienestar: [
    { value: "spa", label: "Spa" },
    { value: "relajacion", label: "Relajación" },
    { value: "meditacion", label: "Meditación" },
  ],
  otros: [
    { value: "general", label: "General" },
  ],
};

export async function listServices(): Promise<Service[]> {
  return [
    {
      id: "1",
      name: "Corte de cabello",
      description: "Corte de cabello profesional con lavado incluido",
      price: {
        amount: 25000,
        currency: "CO",
      },
      teamId: "1",
    },
    {
      id: "2",
      name: "Coloración completa",
      description: "Coloración profesional del cabello con productos de calidad",
      price: {
        amount: 80.00,
        currency: "PEN",
      },
      teamId: "1",
    },
    {
      id: "3",
      name: "Manicure básica",
      description: "Manicure con esmalte regular",
      price: {
        amount: 15.00,
        currency: "PEN",
      },
      teamId: "1",
    },
    {
      id: "4",
      name: "Pedicure spa",
      description: "Pedicure con exfoliación y masaje relajante",
      price: {
        amount: 35.00,
        currency: "PEN",
      },
      teamId: "1",
    },
  ];
}

export async function retrieveService(
  serviceId: string
): Promise<Service | null> {
  const services = await listServices();
  return services.find((service) => service.id === serviceId) ?? null;
} 