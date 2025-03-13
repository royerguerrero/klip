import { Button } from "@heroui/react";

export default function Page() {
  const integrations = [
    {
      logo: "",
      app: "Carterapp",
      description: "Recibe pagos con tarjetas de crédito, Nequi y Daviplata",
    },
    {
      logo: "",
      app: "Airbnb",
      description:
        "Vincula tus reservas de Airbnb para evitar sobre agendamiento",
    },
    {
      logo: "",
      app: "Booking",
      description:
        "Vincula tus reservas de Booking para evitar sobre agendamiento",
    },
  ];
  return (
    <div className="px-4 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="border rounded-xl w-full p-3">Preview</div>
        <div className="border rounded-xl p-3 md:w-96">Form</div>
      </div>
      <div className="flex flex-col gap-0.5">
        <h2 className="font-semibold text-xl tracking-tight leading-none">
          Integraciones
        </h2>
        <p className="text-sm text-neutral-400 font-medium">
          Busca y conecta otras aplicaciones
        </p>
        <div className="flex flex-col gap-2 md:flex-row pt-4 w-">
          {integrations.map((integration, idx) => (
            <div
              key={idx}
              className="bg-neutral-100 border p-3 rounded-lg flex flex-col justify-between md:h-56 md:w-80 gap-3"
            >
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {integration.app}
                </h2>
                <p className="text-neutral-400 font-medium tracking-tight leading-tight text-sm">
                  {integration.description}
                </p>
              </div>
              <Button variant="flat" className="text-sm font-medium" size="sm">
                Conectar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
