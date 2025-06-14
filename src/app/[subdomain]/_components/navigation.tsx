"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  CardsThree,
  CalendarDots,
  Receipt,
  User,
} from "@phosphor-icons/react/dist/ssr";

const navigationItems = [
  {
    href: (subdomain: string) => `/${subdomain}`,
    icon: House,
    label: "Home",
  },
  {
    href: (subdomain: string) => `/${subdomain}/catalog`,
    icon: CardsThree,
    label: "Catálogo",
  },
  {
    href: (subdomain: string) => `/${subdomain}/agenda`,
    icon: CalendarDots,
    label: "Agenda",
  },
  {
    href: (subdomain: string) => `/${subdomain}/orders`,
    icon: Receipt,
    label: "Ordenes",
  },
  {
    href: (subdomain: string) => `/${subdomain}/account`,
    icon: User,
    label: "Cuenta",
  },
];

export function Navigation({ subdomain }: { subdomain: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between border-t md:p-2 bg-neutral-50/50 backdrop-blur rounded-t-lg md:border md:rounded-full md:gap-3 md:w-fit md:mx-auto md:m-3">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const href = item.href(subdomain);
        const isActive = pathname === href;

        return (
          <Link
            key={item.label}
            href={href}
            className={`cursor grid place-items-center w-full md:flex md:gap-2 font-medium md:w-fit p-1 px-3 md:rounded-full group ${
              isActive
                ? "md:bg-neutral-200 text-neutral-950"
                : "text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            <Icon
              weight="fill"
              className={`size-7 md:size-5 ${
                isActive ? "text-neutral-950" : "text-neutral-400 group-hover:text-neutral-950"
              }`}
            />
            <span
              className={`text-[11px] md:text-sm text-center ${
                isActive ? "text-neutral-950" : "group-hover:text-neutral-950"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
