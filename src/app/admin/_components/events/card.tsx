import { UsersThree } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";

interface EventCardProps {
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
  };
}

export default function EventCard({ event }: EventCardProps) {
  const isGroupEvent = event.assistants.length > 1;
  return (
    <article
      className={clsx(
        "flex gap-6 text-sm p-2 rounded-lg w-fill justify-between h-full",
        {
          "bg-amber-100 text-amber-500": isGroupEvent,
          "bg-sky-100 text-sky-500": !isGroupEvent,
        }
      )}
    >
      <div className="flex flex-col">
        <h2 className="font-semibold leading-none flex gap-1">
          {isGroupEvent ? (
            <>
              <UsersThree size={16} weight="fill" />
              {event.service.title}
            </>
          ) : (
            event.assistants[0]
          )}
        </h2>
        <p>
          {isGroupEvent
            ? `${event.assistants.length} participants`
            : event.service.title}
        </p>
      </div>
      <span
        className={clsx(
          "text-xs px-2 py-0.5 rounded-full w-fit font-semibold h-fit text-nowrap",
          {
            "bg-amber-200": isGroupEvent,
            "bg-sky-200": !isGroupEvent,
          }
        )}
      >
        {event.duration} min
      </span>
    </article>
  );
}
