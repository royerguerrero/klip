import EventCardWrapper from "./event-card-wrapper";

interface Event {
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
}

interface AgendaResumeProps {
  events: Event[];
}

export default function AgendaResume({ events }: AgendaResumeProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full px-3 py-2 pb-2">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-semibold text-xl tracking-tight leading-none capitalize">
            {new Date().getHours() < 12
              ? "¡Buenos días!"
              : new Date().getHours() < 19
              ? "¡Buenas tardes!"
              : "¡Buenas noches!"}
          </h1>
          <p className="text-neutral-400 text-sm">
            Tienes <b className="text-neutral-500">{events.length} eventos</b>{" "}
            agendados para hoy
          </p>
        </div>
        <div className="flex md:flex-col gap-1 md:gap-0">
          <p className="text-neutral-400 text-sm">Siguiente Evento:</p>
          <p className="text-neutral-400 text-sm flex gap-1">
            {events.length > 0 ? (
              <span>
                <b className="text-neutral-500">{events[0].service.title}</b>
                {" empieza en "}
                <b className="text-neutral-500">
                  {Math.abs(events[0].date.getTime() - Date.now()) >
                  60 * 60 * 1000
                    ? `${Math.floor(
                        (events[0].date.getTime() - Date.now()) /
                          (60 * 60 * 1000)
                      )} horas`
                    : `${Math.floor(
                        (events[0].date.getTime() - Date.now()) / 60000
                      )} minutos`}
                </b>{" "}
                {events[0].date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            ) : (
              "No hay eventos agendados para hoy"
            )}
          </p>
        </div>
      </div>
      <section className="px-2 w-full flex gap-2 overflow-x-auto">
        {events.map((event) => (
          <EventCardWrapper key={event.id} event={event} />
        ))}
      </section>
    </div>
  );
}
