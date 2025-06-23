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
import Image from "next/image";

const data = {
  user: {
    name: "Mr. Robot",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Transversal 91",
      logo: "ph:columns-fill",
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: "ph:wave-sine-fill",
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: "ph:command-fill",
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/team_1750629021176_pnu1rtmj0/dashboard",
      icon: "ph:house-line-fill",
      iconClassName: "bg-background text-foreground",
      isActive: true,
    },
    {
      title: "Agenda",
      url: "/admin/team_1750629021176_pnu1rtmj0/agenda",
      icon: "ph:calendar-dots-fill",
      iconClassName: "bg-sky-200 text-sky-500",
    },
    {
      title: "Catalogo",
      url: "/admin/team_1750629021176_pnu1rtmj0/catalog",
      icon: "ph:cards-three-fill",
      iconClassName: "bg-fuchsia-200 text-fuchsia-500",
    },
    {
      title: "Clientes",
      url: "/admin/team_1750629021176_pnu1rtmj0/customers",
      icon: "ph:users-three-fill",
      iconClassName: "bg-rose-200 text-rose-500",
    },
    {
      title: "Finanzas",
      url: "/admin/team_1750629021176_pnu1rtmj0/finances",
      icon: "ph:wallet-fill",
      iconClassName: "bg-lime-200 text-lime-600",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" variant="inset" {...props}>
      <SidebarHeader className="p-1 flex flex-row justify-between">
        <Image src="/klip-icon.svg" alt="Logo" width={34} height={36} />
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="px-1">
        <TeamSwitcher teams={data.teams} />
      </SidebarFooter>
    </Sidebar>
  );
}
