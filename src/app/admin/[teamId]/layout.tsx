import { SidebarInset, SidebarProvider } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/admin/_components/sidebar-app";
import { getCurrentSession } from "@/app/admin/_lib/session";
import { CurrentSessionProvider } from "@/app/admin/_contexts/current-session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Klip",
  description: "Administra tu equipo, clientes, agendamientos y Pagos con Klip.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentSession = await getCurrentSession();

  return (
    <CurrentSessionProvider currentSession={currentSession}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="border m-3 rounded-2xl bg-neutral-100 px-1.5 pb-1.5">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </CurrentSessionProvider>
  );
}
