import { Button } from "@/app/_components/ui/button";
import { retrieveService } from "../_lib/data";
import { OnboardingSection } from "../_components/onboarding-section";

type Props = {
  params: Promise<{
    teamId: string;
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id, teamId } = await params;
  const service = await retrieveService(id);

  if (!service) {
    return null;
  }

  return (
    <div className="flex border-t h-full">
      <section className="p-4 w-4/6 space-y-6">
        <article className="space-y-3">
          <h2 className="font-semibold text-secondary-foreground leading-none">
            Información General
          </h2>
          <dl className="grid grid-cols-3 text-sm font-medium">
            <dt className="text-muted-foreground py-2">Nombre:</dt>
            <dd className="col-span-2 py-2">{service.name}</dd>
            <dt className="text-muted-foreground py-2">Descripción:</dt>
            <dd className="col-span-2 py-2">{service.description}</dd>
            <dt className="text-muted-foreground py-2">Precio:</dt>
            <dd className="col-span-2 py-2">
              {service.price.amount} {service.price.currency}
            </dd>
            <dt className="text-muted-foreground py-2">Sesiones:</dt>
            <dd className="col-span-2 py-2">1 sesiones ⋅ 1 hora / sesión</dd>
          </dl>
          <div>
            <Button variant={"outline"}>Editar</Button>
          </div>
        </article>
        <OnboardingSection 
          questions={[
            {
              id: "1",
              label: "Cual es tu nombre?",
              inputType: "name",
              required: true,
              order: 1
            },
            {
              id: "2",
              label: "Email",
              inputType: "email",
              required: true,
              order: 2
            },
            {
              id: "3",
              label: "Numero de teléfono",
              inputType: "phone",
              required: true,
              order: 3
            },
            {
              id: "4",
              label: "Fecha de matrícula",
              inputType: "date",
              required: true,
              order: 4
            },
            {
              id: "5",
              label: "Fecha de nacimiento",
              inputType: "date",
              required: true,
              order: 5
            },
            {
              id: "6",
              label: "Dirección",
              inputType: "long text",
              required: true,
              order: 6
            },
            {
              id: "7",
              label: "EPS",
              inputType: "select",
              required: true,
              order: 7,
              options: [
                "Nueva EPS",
                "EPS Sanitas",
                "EPS Sura",
                "Salud Total EPS",
                "Famisanar",
                "Compensar EPS",
                "EPS Suramericana (Susalud)",
                "Coomeva EPS",
                "Cruz Blanca EPS",
                "Comfenalco Valle EPS",
                "Saludvida EPS",
                "Capresoca EPS",
                "Servicio Occidental de Salud (SOS EPS)",
                "Capital Salud EPS‑S",
                "EPS Familiar de Colombia",
                "Asmet Salud",
                "Emssanar",
                "Mutual Ser",
                "Comfaoriente",
                "Cajacopi (Atlántico)",
                "Comfachocó",
                "Savia Salud",
                "Coosalud EPS-S",
                "Ecoopsos",
                "Salud Mía",
                "Asociación Mutual Barrios Unidos – EPS AmbuQ",
                "Aliansalud EPS",
                "Dusakawi EPSI",
                "Anas Wayuu",
                "Mallamas",
                "Pijaos Salud",
                "EPS Bolívar",
                "Salud Total EPS"
              ]
            },
            {
              id: "8",
              label: "Nombre del acudiente",
              inputType: "name",
              required: false,
              order: 8
            },
            {
              id: "9",
              label: "Teléfono del acudiente",
              inputType: "phone",
              required: false,
              order: 9
            }
          ]} 
        />
      </section>
      <aside className="border-l p-4 flex flex-col gap-4 h-full">
        <h2 className="font-semibold text-secondary-foreground leading-none">
          Propiedades
        </h2>
        <span>Category</span>
        <span>Subcategory</span>
      </aside>
    </div>
  );
}
