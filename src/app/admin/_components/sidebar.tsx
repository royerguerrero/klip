"use client";

import { Button } from "@heroui/react";
import {
  CalendarDots,
  CardsThree,
  CaretUpDown,
  GearSix,
  HouseLine,
  UsersThree,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTeamContext } from "../_contexts/team";

export default function Sidebar() {
  const pathname = usePathname();
  const { activeTeam } = useTeamContext();

  const items = [
    {
      href: `/admin/dashboard`,
      label: "Dashboard",
      icon: <HouseLine size={20} weight="fill" />,
      className: "border bg-neutral-50",
    },
    {
      href: `/admin/${activeTeam.id}/agenda`,
      label: "Agenda",
      icon: <CalendarDots size={20} weight="fill" />,
      className: "bg-sky-200 text-sky-500",
    },
    {
      href: `/admin/${activeTeam.id}/catalog`,
      label: "Catalogo",
      icon: <CardsThree size={20} weight="fill" />,
      className: "bg-fuchsia-200 text-fuchsia-500",
    },
    {
      href: `/admin/${activeTeam.id}/customers`,
      label: "Clientes",
      icon: <UsersThree size={20} weight="fill" />,
      className: "bg-rose-200 text-rose-500",
    },
    {
      href: `/admin/${activeTeam.id}/finances`,
      label: "Finanzas",
      icon: <Wallet size={20} weight="fill" />,
      className: "bg-lime-200 text-lime-600",
    },
  ];

  return (
    <aside className="w-80 border-r p-3 hidden md:flex flex-col gap-3 justify-between bg-neutral-100">
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              className="w-full font-semibold tracking-tight justify-start p-1"
              variant={pathname.startsWith(item.href) ? "flat" : "light"}
            >
              <span className={`p-1 rounded-lg ${item.className}`}>
                {item.icon}
              </span>
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div>
        <div className="border rounded-xl mb-2 p-2 bg-neutral-50 flex gap-2 items-center justify-between relative">
          <span className="font-semibold tracking-tight text-sm">
            {activeTeam.name}
          </span>
          <CaretUpDown size={16} className="text-neutral-400" />
        </div>
        <Link href="/admin/settings/company">
          <Button
            className="w-full font-semibold tracking-tight justify-start p-1"
            variant={pathname.startsWith(`/admin/settings/`) ? "flat" : "light"}
          >
            <span className="p-1 rounded-lg bg-neutral-200 text-neutral-500">
              <GearSix size={20} weight="fill" />
            </span>
            Configuración
          </Button>
        </Link>
      </div>
    </aside>
  );
}
