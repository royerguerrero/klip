import EventCard from "../../_components/events/card";

function CalendarIcon({ date }: { date: Date }) {
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const weekday = date.toLocaleString("default", { weekday: "short" });

  return (
    <span className="rounded-md font-semibold uppercase flex flex-col items-center border text-center w-fit h-fit">
      <span className="bg-rose-500 text-neutral-50 w-full py-px rounded-t-md text-[10px] px-3.5">
        {month}
      </span>
      <div className="flex flex-col items-center py-1 gap-px">
        <span className="text-sm leading-none">{day}</span>
        <span className="text-[8px] text-neutral-400 leading-none">
          {weekday}
        </span>
      </div>
    </span>
  );
}

export default function AgendaPage() {
  const events = [
    {
      id: "1",
      service: {
        id: "service1",
        title: "Traditional haircut",
      },
      date: new Date(new Date().setHours(20, 0, 0, 0)),
      duration: 30,
      assistants: ["Robert Pathinson"],
      provider: {
        id: "provider1",
        name: "Xiomara Pacheco",
      },
      revenue: 25000,
    },
    {
      id: "2",
      service: {
        id: "service2",
        title: "Pilates Group Class",
      },
      date: new Date(new Date().setHours(21, 30, 0, 0)),
      duration: 60,
      assistants: ["Maria", "John", "Sarah", "Lisa"],
      provider: {
        id: "provider2",
        name: "Jane Doe",
      },
      revenue: 80000,
    },
  ];

  // Generate dates for the week view (4 days before and after current day)
  const currentDate = new Date();
  const weekDates = Array.from({ length: 9 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + (i - 4)); // -4 to get 4 days before current day
    return date;
  });

  return (
    <section>
      <div className="grid grid-cols-[80px_1fr]">
        {weekDates.map((date) => (
          <>
            <div
              key={`calendar-${date.toISOString()}`}
              className="min-h-16 border-b pl-4 flex flex-col items-center justify-self-end p-2 gap-1"
            >
              <CalendarIcon date={date} />
              {date.toDateString() === currentDate.toDateString() && (
                <span className="text-xs text-rose-500 font-bold uppercase bg-rose-50 rounded-full px-2 py-0.5">
                  Hoy
                </span>
              )}
            </div>
            <div
              key={`events-${date.toISOString()}`}
              className="border-b flex flex-col gap-2 pr-3 py-2"
            >
              {events
                .filter(
                  (event) =>
                    event.date.getDate() === date.getDate() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getFullYear() === date.getFullYear()
                )
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              {events.filter(
                (event) =>
                  event.date.getDate() === date.getDate() &&
                  event.date.getMonth() === date.getMonth() &&
                  event.date.getFullYear() === date.getFullYear()
              ).length === 0 && (
                <span className="text-neutral-400 text-sm">
                  No hay agendamientos para este dia.
                </span>
              )}
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
