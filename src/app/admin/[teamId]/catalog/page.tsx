import Heading from "../../_components/heading";
import ServiceForm from "./_components/service-form";
import { listServices } from "./_lib/data";

export default async function Page() {
  const services = await listServices();

  return (
    <>
      <Heading title="Catalog">
        <ServiceForm />
      </Heading>
      <div className="flex flex-wrap gap-3 px-3">
        <div className="w-96 border p-3 bg-neutral-100 rounded-xl">
          <h2></h2>
        </div>
        {services.map((service) => (
          <div key={service.id}>{service.title}</div>
        ))}
      </div>
    </>
  );
}
