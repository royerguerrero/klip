"use client";

import { Icon } from "@iconify/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/_components/ui/sidebar";
import { useCurrentSession } from "@/app/admin/_contexts/current-session";
import { useRouter } from "next/navigation";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { session, updateCurrentTeam } = useCurrentSession();
  const { teams, organization } = session;
  const activeTeam = session.currentTeam || teams[0];
  const router = useRouter();

  if (!activeTeam || teams.length === 0) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-1 h-fit rounded-lg bg-background border"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Icon
                  icon={organization?.logo || "ph:building-fill"}
                  height={16}
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="text-muted-foreground truncate text-xs font-medium line-clamp-1">
                  {organization?.name}
                </span>
              </div>
              <Icon icon="ph:caret-up-down" height={8} className="mr-1" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            side={isMobile ? "bottom" : "right"}
            sideOffset={6}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Equipos
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={async () => {
                  await updateCurrentTeam(team);
                  router.push(`/admin/${team.id}/dashboard`);
                }}
                className="p-2"
              >
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Icon icon="ph:plus-bold" height={12} />
              </div>
              <div className="text-muted-foreground font-medium">
                Agregar equipo
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
