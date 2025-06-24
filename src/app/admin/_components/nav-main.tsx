"use client";

import { Icon } from "@iconify-icon/react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { cn } from "@/app/_lib/utils";
import { usePathname } from "next/navigation";

import Link from "next/link";

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
    <SidebarGroup className="px-1">
      <SidebarMenu className="gap-1">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={cn(
                "h-fit p-1.5 hover:bg-neutral-200 rounded-lg transition-colors",
                pathname.includes(item.url) && "bg-neutral-200 text-neutral-900"
              )}
            >
              <Link
                href={item.url}
                className="font-semibold text-sm tracking-tight"
              >
                <span
                  className={cn(
                    "p-1 rounded-md bg-background grid place-items-center",
                    item.iconClassName
                  )}
                >
                  {item.icon && <Icon icon={item.icon} height={20} />}
                </span>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
