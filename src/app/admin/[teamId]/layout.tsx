import { SidebarInset, SidebarProvider } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/admin/_components/sidebar-app";
import { getCurrentSession } from "@/app/admin/_lib/session";
import { CurrentSessionProvider } from "@/app/admin/_contexts/current-session";
import type { Metadata } from "next";
import { DrizzleUserRepository } from "@/contexts/users/infrastructure/persistence/DrizzleUserRepository";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";

export const metadata: Metadata = {
  title: "Dashboard | Klip",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentSession = await getCurrentSession();
  const userRepository = new DrizzleUserRepository(db);
  const criteria = new Criteria([
    new Filter("email", Operator.EQUAL, "royjuni3431@gmail.com"),
  ]);
  const users = await userRepository.matching(criteria);
  console.log("users >>>", users);

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
