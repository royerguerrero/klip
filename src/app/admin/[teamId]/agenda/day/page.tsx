"use client";

import EventCard from "@/app/admin/_components/events/card";
import { useEffect, useState, useRef } from "react";

const CALENDAR_CONFIG = {
  START_HOUR: 0,
  END_HOUR: 24,
  SLOT_HEIGHT: 64, // pixels per 15-minute slot
  SLOTS_PER_HOUR: 4,
  UPDATE_INTERVAL: 60000, // 1 minute in milliseconds
};

// Mock data for events
const events = [
  {
    id: "1",
    service: {
      id: "service1",
      title: "Traditional haircut",
    },
    date: new Date(new Date().setHours(8, 0, 0, 0)),
    duration: 30,
    assistants: ["Robert Pathinson"],
    provider: {
      id: "provider1",
      name: "Xiomara Pacheco",
    },
  },
  {
    id: "3",
    service: {
      id: "service1",
      title: "Traditional haircut",
    },
    date: new Date(new Date().setHours(10, 0, 0, 0)),
    duration: 30,
    assistants: ["Elon Musk"],
    provider: {
      id: "provider1",
      name: "Angela Merkel",
    },
  },
  {
    id: "2",
    service: {
      id: "service2",
      title: "Pilates Group Class",
    },
    date: new Date(new Date().setHours(14, 30, 0, 0)),
    duration: 60,
    assistants: ["Maria", "John", "Sarah", "Lisa"],
    provider: {
      id: "provider2",
      name: "Jane Doe",
    },
  },
];

export default function DayView() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, CALENDAR_CONFIG.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Scroll to current time when component mounts or time updates
  useEffect(() => {
    if (containerRef.current) {
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const cursorTop =
        (currentHour - CALENDAR_CONFIG.START_HOUR) *
          (CALENDAR_CONFIG.SLOT_HEIGHT * CALENDAR_CONFIG.SLOTS_PER_HOUR) +
        (currentMinute / 60) *
          (CALENDAR_CONFIG.SLOT_HEIGHT * CALENDAR_CONFIG.SLOTS_PER_HOUR);

      // Center the cursor in the viewport
      const viewportHeight = window.innerHeight;
      const scrollPosition =
        cursorTop -
        viewportHeight / 2 +
        (CALENDAR_CONFIG.SLOT_HEIGHT * CALENDAR_CONFIG.SLOTS_PER_HOUR) / 2;

      containerRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentTime]);

  // Generate time slots from START_HOUR to END_HOUR
  const timeSlots = Array.from(
    { length: CALENDAR_CONFIG.END_HOUR - CALENDAR_CONFIG.START_HOUR + 1 },
    (_, i) => {
      const hour = i + CALENDAR_CONFIG.START_HOUR;
      return new Date(new Date().setHours(hour, 0, 0, 0));
    }
  );

  // Calculate cursor position
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const cursorTop =
    (currentHour - CALENDAR_CONFIG.START_HOUR) *
      (CALENDAR_CONFIG.SLOT_HEIGHT * CALENDAR_CONFIG.SLOTS_PER_HOUR) +
    (currentMinute / 60) *
      (CALENDAR_CONFIG.SLOT_HEIGHT * CALENDAR_CONFIG.SLOTS_PER_HOUR);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div
        className="grid grid-cols-[80px_1fr] h-full overflow-y-auto"
        ref={containerRef}
      >
        {/* Time column */}
        <div className="flex flex-col">
          {timeSlots.map((time) => (
            <div
              key={time.getTime()}
              className="border-b border-neutral-200 flex items-start justify-end pr-2"
              style={{
                height: `${
                  CALENDAR_CONFIG.SLOT_HEIGHT * CALENDAR_CONFIG.SLOTS_PER_HOUR
                }px`,
              }}
            >
              <span className="text-xs text-neutral-500">
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>

        {/* Events column */}
        <div className="relative">
          {/* Time grid lines */}
          <div className="absolute inset-0">
            {timeSlots.map((time) => (
              <div
                key={time.getTime()}
                className="border-b border-neutral-200"
                style={{
                  height: `${
                    CALENDAR_CONFIG.SLOT_HEIGHT * CALENDAR_CONFIG.SLOTS_PER_HOUR
                  }px`,
                }}
              />
            ))}
          </div>

          {/* Current time cursor */}
          {currentHour >= CALENDAR_CONFIG.START_HOUR &&
            currentHour <= CALENDAR_CONFIG.END_HOUR && (
              <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{ top: `${cursorTop}px` }}
              >
                <div className="relative">
                  <div className="absolute left-0 right-0 h-0.5 bg-rose-500/30 z-50" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-full px-2 py-1 bg-rose-500/30 text-rose-500 text-tiny font-semibold rounded-full whitespace-nowrap">
                    {currentTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            )}

          {/* Events */}
          <div className="absolute inset-0">
            {events.map((event) => {
              const startHour = event.date.getHours();
              const startMinute = event.date.getMinutes();
              const top =
                (startHour - CALENDAR_CONFIG.START_HOUR) *
                  (CALENDAR_CONFIG.SLOT_HEIGHT *
                    CALENDAR_CONFIG.SLOTS_PER_HOUR) +
                (startMinute / 60) *
                  (CALENDAR_CONFIG.SLOT_HEIGHT *
                    CALENDAR_CONFIG.SLOTS_PER_HOUR);
              const height =
                (event.duration / 60) *
                (CALENDAR_CONFIG.SLOT_HEIGHT * CALENDAR_CONFIG.SLOTS_PER_HOUR);

              return (
                <div
                  key={event.id}
                  className="absolute left-0 right-0"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                  }}
                >
                  <div className="px-2 h-full">
                    <EventCard event={event} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
