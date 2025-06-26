"use client";

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentSession } from "../../_contexts/current-session";

export function DashboardNav() {
  const pathname = usePathname();
  const { session } = useCurrentSession();

  const items = [
    {
      label: "Resumen",
      href: `/admin/${session.currentTeam?.id}/dashboard`,
    },
    {
      label: "Transaciones",
      href: `/admin/${session.currentTeam?.id}/dashboard/transactions`,
    },
    {
      label: "Clientes",
      href: `/admin/${session.currentTeam?.id}/dashboard/customers`,
    },
  ];

  return (
    <nav className="flex gap-2 border-b w-full px-3">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Button
            key={item.label}
            variant="ghost"
            className={`border-b-2 h-9 rounded-none text-neutral-400 hover:border-primary/80 hover:text-primary hover:bg-inherit ${
              isActive ? "border-primary/80 text-primary" : "border-transparent"
            }`}
            asChild
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
