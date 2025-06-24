"use client";

import { useEffect, useState } from "react";
import Event from "./event";

interface Event {
  title: string;
  description: string;
  start: string;
  end: string;
  price: number;
  timeUntil: string;
  startTime: string;
}

interface AgendaResumeProps {
  eventCount: number;
  comingEvents: Event[];
}

export function AgendaResume({ eventCount, comingEvents }: AgendaResumeProps) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        return "¡Buenos días!";
      } else if (hour >= 12 && hour < 18) {
        return "¡Buenas tardes!";
      } else {
        return "¡Buenas noches!";
      }
    };

    setGreeting(getGreeting());
  }, []);

  return (
    <>
      <section className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full px-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-semibold text-xl tracking-tight leading-none capitalize">
            {greeting}
          </h1>
          <p className="text-neutral-400 text-sm">
            Tienes <b className="text-neutral-500">{eventCount} eventos</b>{" "}
            agendados para hoy
          </p>
        </div>
        {comingEvents.length > 0 && (
          <div className="flex md:flex-col gap-1 md:gap-0">
            <p className="text-neutral-400 text-sm">Siguiente Evento:</p>
            <p className="text-neutral-400 text-sm flex gap-1">
              <span>
                <b className="text-neutral-500">{comingEvents[0].title}</b>{" "}
                empieza en{" "}
                <b className="text-neutral-500">{comingEvents[0].timeUntil}</b>{" "}
                {comingEvents[0].startTime}
              </span>
            </p>
          </div>
        )}
      </section>
      <section className="flex gap-2 px-3">
        {comingEvents.map((event, index) => (
          <Event
            key={index}
            title={event.title}
            description={event.description}
            start={event.start}
            end={event.end}
            price={event.price}
          />
        ))}
      </section>
    </>
  );
}
