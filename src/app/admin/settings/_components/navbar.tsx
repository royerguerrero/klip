"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const items = [
    {
      url: "/admin/settings/company",
      label: "Perfil de Empresa",
    },
    {
      url: "/admin/settings/teams",
      label: "Equipos",
    },
    {
      url: "/admin/settings/profile",
      label: "Perfil",
    },
    {
      url: "/admin/settings/billing",
      label: "Facturación",
    },
  ];
  return (
    <nav className="flex px-3 border-b">
      {items.map((item, idx) => (
        <Link key={idx} href={item.url}>
          <Button
            className={`border-b-2 px-3 ${
              pathname === item.url
                ? "font-medium border-primary-300"
                : "border-transparent"
            }`}
            variant="light"
            radius="none"
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
