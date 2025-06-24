"use client";

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentSession } from "../../../_contexts/current-session";

type Props = {
  customerId: string;
};

export function CustomerNav({ customerId }: Props) {
  const pathname = usePathname();
  const { session } = useCurrentSession();

  const items = [
    {
      label: "General",
      href: `/admin/${session.currentTeam.id}/customers/${customerId}`,
    },
    {
      label: "Agendamientos",
      href: `/admin/${session.currentTeam.id}/customers/${customerId}/agenda`,
    },
    {
      label: "Pagos",
      href: `/admin/${session.currentTeam?.id}/customers/${customerId}/payments`,
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
            className={`border-b-2 rounded-none text-neutral-400 hover:border-primary/80 hover:text-primary hover:bg-inherit ${
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
