import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Service } from "../_lib/types";

type Props = {
  service: Service;
};

export default function ServiceCard({ service }: Props) {
  return (
    <article className="rounded-lg border p-1 px-2 bg-neutral-100">
      <h2 className="text-base font-semibold">{service.title}</h2>
      <p className="text-sm text-neutral-500 line-clamp-2 leading-tight">
        {service.description}
      </p>
      <div className="flex justify-between items-center pt-0.5">
        <p className="text-sm font-medium my-1">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: service.pricing.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(service.pricing.amount)}
          <span className="text-neutral-500">
            ・
            {service.sessions.amount > 1 &&
              `${service.sessions.amount} Sesiones・`}
            {new Intl.NumberFormat("es-CO", {
              style: "unit",
              unit:
                (service.sessions.duration * service.sessions.amount) / 60 < 1
                  ? "minute"
                  : "hour",
              unitDisplay: "long",
              maximumFractionDigits: 1,
            }).format(
              (service.sessions.duration * service.sessions.amount) / 60
            )}
          </span>
        </p>
        <span className="text-sm font-medium text-neutral-500 flex gap-1 justify-center items-center leading-none">
          Reservar <CaretRight size={12} weight="bold" />
        </span>
      </div>
    </article>
  );
}
