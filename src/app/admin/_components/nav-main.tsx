"use client";

import { Icon } from "@iconify/react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { cn } from "@/app/_lib/utils";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: string;
    iconClassName?: string;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup className="px-0">
      <SidebarMenu className="gap-1">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title} className={cn("h-fit p-1.5 hover:bg-neutral-200 rounded-lg transition-colors", pathname === item.url && "bg-neutral-200")}>
              <a
                href={item.url}
                className="font-semibold text-sm tracking-tight"
              >
                <span
                  className={cn(
                    "p-1 rounded-md bg-background",
                    item.iconClassName
                  )}
                >
                  {item.icon && <Icon icon={item.icon} className="size-5" />}
                </span>
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
