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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useCurrentSession();
  const currentTeam = session.organization?.currentTeam;

  const navMain = [
    {
      title: "Dashboard",
      url: `/admin/${currentTeam?.id}/dashboard`,
      icon: "ph:house-line-fill",
      iconClassName: "bg-background text-foreground",
      isActive: true,
    },
    {
      title: "Ordenes",
      url: `/admin/${currentTeam?.id}/orders`,
      icon: "ph:book-open-fill",
      iconClassName: "bg-orange-200 text-orange-500",
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
      <SidebarFooter className="flex gap-2 py-2 px-0">
        <article className="flex items-center border rounded-lg p-1.5 bg-background">
          <Image src="/klip-icon.svg" alt="Logo" width={30} height={30} />
        </article>
        <NavUser
          user={{
            name: `${session.user.firstName} ${session.user.lastName}`,
            email: session.user.email,
            avatar: "/avatars/user.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
