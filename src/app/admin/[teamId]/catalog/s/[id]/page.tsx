import { ServiceResponseDTO } from "@/contexts/backoffice/service/application/ServiceResponse";
import { Button, Form, Tooltip } from "@heroui/react";
import { CardDetail } from "@/app/admin/_components/card-detail";
import ServiceInformationForm from "../../_components/forms/service/information";
import Heading from "./_components/heading";

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
      <Heading
        title="Información General"
        description="Ingresa los datos del servicio para que los clientes puedan verlo en el catálogo."
      />
      <ServiceInformationForm />
    </>
  );
}
