"use client";

import * as React from "react";

import { NavMain } from "@/app/admin/_components/nav-main";
import { NavUser } from "@/app/admin/_components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import { useCurrentSession } from "@/app/admin/_contexts/current-session";
import { TeamSwitcher } from "./team-switcher";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useCurrentSession();

  const navMain = [
    {
      title: "Dashboard",
      url: `/admin/${session.currentTeam.id}/dashboard`,
      icon: "ph:house-line-fill",
      iconClassName: "bg-background text-foreground",
      isActive: true,
    },
    {
      title: "Ordenes",
      url: `/admin/${session.currentTeam.id}/orders`,
      icon: "ph:book-open-fill",
      iconClassName: "bg-background text-foreground",
      isActive: true,
    },
    {
      title: "Agenda",
      url: `/admin/${session.currentTeam.id}/agenda`,
      icon: "ph:calendar-dots-fill",
      iconClassName: "bg-sky-200 text-sky-500",
    },
    {
      title: "Catalogo",
      url: `/admin/${session.currentTeam.id}/catalog`,
      icon: "ph:cards-three-fill",
      iconClassName: "bg-fuchsia-200 text-fuchsia-500",
    },
    {
      title: "Clientes",
      url: `/admin/${session.currentTeam.id}/customers`,
      icon: "ph:users-three-fill",
      iconClassName: "bg-rose-200 text-rose-500",
    },
    {
      title: "Finanzas",
      url: `/admin/${session.currentTeam.id}/finances`,
      icon: "ph:bank-fill",
      iconClassName: "bg-lime-200 text-lime-600",
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" variant="inset" {...props}>
      <SidebarHeader className="p-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <TeamSwitcher />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="flex flex-row justify-between items-center gap-2 px-2">
        <Image src="/klip-icon.svg" alt="Logo" width={36} height={36} />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
