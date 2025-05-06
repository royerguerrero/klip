import EventCard from "../../_components/events/card";

interface EventCardWrapperProps {
  event: {
    id: string;
    service: {
      id: string;
      title: string;
    };
    date: Date;
    duration: number;
    assistants: string[];
    provider: {
      id: string;
      name: string;
    };
    revenue: number;
  };
}

export default function EventCardWrapper({ event }: EventCardWrapperProps) {
  return (
    <div className="flex flex-col gap-1 bg-white p-2 rounded-xl w-[280px] min-w-[280px] overflow-x-auto pb-2">
      <EventCard event={event} />
      <div className="flex justify-between items-center text-xs px-1 text-neutral-400 gap-6 uppercase">
        <p className="text-lime-500 font-semibold">
          {event.revenue > 0 ? "±" : ""}
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(event.revenue)}
        </p>
        <div className="flex gap-1">
          <time>
            {event.date
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(
                / (AM|PM)/,
                event.date.getHours() >= 12 ===
                  new Date(
                    event.date.getTime() + event.duration * 60000
                  ).getHours() >=
                    12
                  ? ""
                  : ""
              )}
          </time>
          <span>-</span>
          <time>
            {new Date(
              event.date.getTime() + event.duration * 60000
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </time>
        </div>
      </div>
    </div>
  );
}
