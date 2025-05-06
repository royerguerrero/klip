import { Chip } from "@heroui/react";
import Heading from "../../_components/heading";
import ServiceForm from "./_components/service-form";
import { listServices } from "./_lib/data";
import {
  ClockCountdown,
  Coin,
  MapPinArea,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type Props = {
  params: Promise<{ teamId: string }>;
};

// Helper function to format duration
const formatDuration = (duration: { unit: string; value: number }): string => {
  if (duration.unit === "hours") {
    return `${duration.value} hr${duration.value !== 1 ? "s" : ""}`;
  }

  if (duration.unit === "minutes" && duration.value >= 60) {
    const hours = Math.floor(duration.value / 60);
    const minutes = duration.value % 60;

    if (minutes === 0) {
      return `${hours} hr${hours !== 1 ? "s" : ""}`;
    }

    return `${hours} hr${hours !== 1 ? "s" : ""} ${minutes} min`;
  }

  return `${duration.value} min`;
};

export default async function Page({ params }: Props) {
  const team = (await params).teamId;
  const services = await listServices();

  return (
    <>
      <Heading title="Catalogo">
        <ServiceForm />
      </Heading>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-3 px-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`catalog/s/${service.id}`}
            className="border p-3 bg-neutral-100 rounded-xl"
          >
            <h2 className="font-semibold tracking-tight leading-snug line-clamp-1">
              {service.title}
            </h2>
            <p className="text-neutral-500 text-sm leading-4 line-clamp-2">
              {service.description}
            </p>
            <div className="flex flex-wrap items-center gap-1 pt-2">
              <Chip
                size="sm"
                variant="flat"
                radius="md"
                startContent={<MapPinArea size={16} weight="duotone" />}
              >
                Transversal 91
              </Chip>
              <Chip
                size="sm"
                variant="flat"
                startContent={<Coin size={16} weight="duotone" />}
              >
                {service.payment.type == "onetime" && "Pago Unico"}
              </Chip>
              <Chip
                size="sm"
                variant="flat"
                startContent={<ClockCountdown size={16} weight="duotone" />}
              >
                {formatDuration(service.duration)}
              </Chip>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
