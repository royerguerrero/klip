import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { DashboardNav } from "../_components/dashboard-nav";
import { AgendaResume } from "../_components/agenda-resume";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const comingEvents = [
    {
      title: "Traditional haircut",
      description: "Traditional haircut",
      start: "08:00",
      end: "08:30",
      price: 25000,
      timeUntil: "5 horas y 1 minutos",
      startTime: "08:00 PM",
    },
    {
      title: "Traditional haircut",
      description: "Traditional haircut",
      start: "08:00",
      end: "08:30",
      price: 25000,
      timeUntil: "5 horas y 1 minutos",
      startTime: "08:00 PM",
    },
  ];

  return (
    <PageWrapper title="Dashboard">
      <main className="space-y-3 py-4">
        <AgendaResume
          eventCount={comingEvents.length}
          comingEvents={comingEvents}
        />
        <section className="flex gap-2">
          <DashboardNav />
        </section>
        {children}
      </main>
    </PageWrapper>
  );
}
