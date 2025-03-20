import Heading from "@/app/admin/_components/heading";
import { ServiceResponseDTO } from "@/contexts/backoffice/service/application/ServiceResponse";
import { Button, Tooltip } from "@heroui/react";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import ServiceDetailTabs from "./_components/tabs";
import Link from "next/link";

type Props = {
  params: Promise<{ teamId: string; id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const service = {
    id: id,
    title: "Tecnico en Barberia",
    description: "Test",
  } as ServiceResponseDTO;

  const teamId = (await params).teamId;

  return (
    <>
      <Heading title={service.title}>
        <div className="flex gap-2">
          <Link href={`/admin/${teamId}/catalog`}>
            <Tooltip content="Regresar" placement="left">
              <Button size="sm" variant="flat" isIconOnly>
                <CaretLeft size={16} />
              </Button>
            </Tooltip>
          </Link>
          <Button
            variant="flat"
            size="sm"
            color="primary"
            className="text-sm font-medium"
          >
            Guardar
          </Button>
        </div>
      </Heading>
      <ServiceDetailTabs />
    </>
  );
}
