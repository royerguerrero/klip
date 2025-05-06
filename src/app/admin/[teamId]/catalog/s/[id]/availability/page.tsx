import Heading from "../_components/heading";
import LocationDropdown from "./_component/LocationDropdown";

export default function Page() {
  const options = [
    {
      key: "IN_PERSON",
      label: "En persona (ubicación del proveedor)",
      component: <div>En el lugar</div>,
    },
    {
      key: "AT_HOME",
      label: "Domicilio (ubicación del cliente)",
      component: <div>Domicilio</div>,
    },
  ];

  return (
    <>
      <Heading
        title="Disponibilidad"
        description="Configura la disponibilidad del servicio y las reglas de agendamiento."
      />
      <div className="flex flex-col gap-2 px-3">
        {options.map((option) => (
          <LocationDropdown key={option.key} label={option.label}>
            {option.component}
          </LocationDropdown>
        ))}
      </div>
    </>
  );
}
