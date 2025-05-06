import ServiceInformationForm from "../../_components/forms/service/information";
import Heading from "./_components/heading";

type Props = {
  params: Promise<{ teamId: string; id: string }>;
};

export default async function Page({ params }: Props) {
  console.log(params);

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
