"use client";

import { Icon } from "@iconify-icon/react";

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
  const { organization } = session;
  const teams = organization?.teams || [];
  const activeTeam = organization?.currentTeam || teams[0];
  const router = useRouter();

  if (!activeTeam || teams.length === 0) {
    return null;
  }

  const handleTeamChange = (team: { id: string; name: string }) => {
    updateCurrentTeam(team);
    router.push(`/admin/${team.id}/dashboard`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-1 h-fit"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8.5 items-center justify-center rounded-lg">
                <Icon icon={organization?.logo || "ph:flag-fill"} height={18} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight gap-0.5">
                <span className="truncate font-semibold leading-none">
                  {activeTeam.name}
                </span>
                <span className="text-muted-foreground truncate text-xs font-medium line-clamp-1 leading-none">
                  {organization?.name}
                </span>
              </div>
              <Icon icon="ph:caret-up-down" height={14} className="mr-1" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={10}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Equipos
            </DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={async () => {
                  await handleTeamChange(team);
                }}
                className="p-2 flex justify-between"
              >
                {team.name}
                <Icon 
                  icon={team.id === activeTeam.id ? "ph:seal-fill" : "ph:seal-bold"} 
                  height={14} 
                  className={team.id === activeTeam.id ? "text-lime-500" : "text-muted-foreground"} 
                />
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
