import { Button } from "@/app/_components/ui/button";
import { retrieveService } from "../_lib/data";
import { OnboardingSection } from "../_components/onboarding-section";
import { Badge } from "@/app/_components/ui/badge";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

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
      <section className="p-4 w-full space-y-6">
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
            <Button variant={"outline"} asChild>
              <Link href={`/admin/${teamId}/catalog/edit/${id}`}>Editar</Link>
            </Button>
          </div>
        </article>
        <OnboardingSection
          questions={service.questions.map((q) => ({
            id: q.id,
            label: q.label,
            inputType: q.inputType,
            required: q.required,
            order: q.order,
            options: q.options as unknown as string[],
          }))}
        />
      </section>
      <aside className="border-l p-4 flex flex-col gap-4 h-full w-[480px]">
        <h2 className="font-semibold text-secondary-foreground leading-none">
          Propiedades
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <span className="text-sm text-muted-foreground font-medium w-24">
              Categoría
            </span>
            <Badge>Programa</Badge>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-sm text-muted-foreground font-medium w-24">
              Subcategoría
            </span>
            <Badge>
              <Icon icon="ph:plus-circle-bold" height={14} />
              Añadir sub-categoría
            </Badge>
          </div>
        </div>
      </aside>
    </div>
  );
}
