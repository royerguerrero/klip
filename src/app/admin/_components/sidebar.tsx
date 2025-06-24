"use client";

import * as React from "react";

import { NavMain } from "@/app/admin/_components/nav-main";
import { NavUser } from "@/app/admin/_components/nav-user";
import { TeamSwitcher } from "@/app/admin/_components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/app/_components/ui/sidebar";
import { useCurrentSession } from "@/app/admin/_contexts/current-session";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useCurrentSession();
  const currentTeam = session.currentTeam;

  const navMain = [
    {
      title: "Dashboard",
      url: `/admin/${currentTeam?.id}/dashboard`,
      icon: "ph:house-line-fill",
      iconClassName: "bg-background text-foreground",
      isActive: true,
    },
    {
      title: "Agenda",
      url: `/admin/${currentTeam?.id}/agenda`,
      icon: "ph:calendar-dots-fill",
      iconClassName: "bg-sky-200 text-sky-500",
    },
    {
      title: "Catalogo",
      url: `/admin/${currentTeam?.id}/catalog`,
      icon: "ph:cards-three-fill",
      iconClassName: "bg-fuchsia-200 text-fuchsia-500",
    },
    {
      title: "Clientes",
      url: `/admin/${currentTeam?.id}/customers`,
      icon: "ph:users-three-fill",
      iconClassName: "bg-rose-200 text-rose-500",
    },
    {
      title: "Finanzas",
      url: `/admin/${currentTeam?.id}/finances`,
      icon: "ph:wallet-fill",
      iconClassName: "bg-lime-200 text-lime-600",
    },
  ];

  const user = {
    name: session.user?.name || "User",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar collapsible="offcanvas" variant="inset" {...props}>
      <SidebarHeader className="p-1 flex flex-row justify-between items-center">
        <Image src="/klip-icon.svg" alt="Logo" width={36} height={36} />
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="px-1">
        <TeamSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
