"use client";

import { useTeamContext } from "@/app/admin/_contexts/team";
import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";

type Props = {
  serviceId: string;
};

export default function ServiceDetailTabs({ serviceId }: Props) {
  const pathname = usePathname();
  const { activeTeam } = useTeamContext();

  const items = [
    {
      title: "Información",
      href: `/admin/${activeTeam.id}/catalog/s/${serviceId}`,
    },
    {
      title: "Disponibilidad",
      href: `/admin/${activeTeam.id}/catalog/s/${serviceId}/availability`,
    },
    {
      title: "Pagos",
      href: `/admin/${activeTeam.id}/catalog/s/${serviceId}/payments`,
    },
    {
      title: "Preguntas",
      href: `/admin/${activeTeam.id}/catalog/s/${serviceId}/onboarding`,
    },
    {
      title: "Proveedores",
      href: `/admin/${activeTeam.id}/catalog/s/${serviceId}/providers`,
    },
  ];

  return (
    <Tabs
      aria-label="Tabs Service Detail"
      variant="underlined"
      classNames={{
        base: "w-full fixed bg-white/70 backdrop-blur",
        tab: "w-fit font-semibold tracking-tight py-5",
        tabList:
          "w-full relative rounded-none p-0 border-b h-fit overflow-y-hidden gap-0",
        panel: "px-4",
        cursor: "bg-primary/70",
        tabContent:
          "group-data-[selected=true]:text-primary/70 text-neutral-400 py-4",
      }}
      color="primary"
      selectedKey={pathname}
    >
      {items.map((item) => (
        <Tab key={item.href} title={item.title} href={item.href} />
      ))}
      {pathname}
    </Tabs>
  );
}
