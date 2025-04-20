import { auth } from "@/app/auth";
import { nextEvents } from "./_lib/data";
import { Suspense } from "react";
import AgendaResume from "./_components/agenda-resume";
import AgendaResumeLoading from "./_components/agenda-resume-loading";
import ActivityTabs from "./_components/activity-tabs";
import ActivityTabsLoading from "./_components/activity-tabs-loading";

export default async function Page() {
  const session = await auth();
  console.log("session >>>", session);
  const events = await nextEvents(session?.user?.id || "");
  console.log("events >>>", events);

  const comingEvents = [
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

  return (
    <div className="py-2 flex flex-col gap-3">
      <Suspense fallback={<AgendaResumeLoading />}>
        <AgendaResume events={comingEvents} />
      </Suspense>
      <section className="w-full py-2 pb-2">
        <Suspense fallback={<ActivityTabsLoading />}>
          <ActivityTabs />
        </Suspense>
      </section>
    </div>
  );
}
