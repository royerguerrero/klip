"use client";

import {
  Button,
  Calendar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import {
  CaretDown,
  CaretRight,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import { useTeamContext } from "../../_contexts/team";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { parseDate } from "@internationalized/date";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { activeTeam } = useTeamContext();
  const [date, setDate] = useState(new Date());

  const views = [
    {
      label: "Agenda",
      href: `/admin/${activeTeam.id}/agenda`,
    },
    {
      label: "Día",
      href: `/admin/${activeTeam.id}/agenda/day`,
    },
  ];

  return (
    <>
      <header className="flex justify-between w-full items-center pl-2 pr-3 py-2 pb-2 sticky top-0 left-0 z-50 bg-neutral-50">
        <div className="flex items-center">
          <Dropdown placement="bottom-start" className="rounded-lg">
            <DropdownTrigger>
              <Button
                variant="light"
                size="sm"
                className="text-sm tracking-tight font-medium p-2 group"
                endContent={
                  <CaretRight
                    className="group-hover:rotate-90 transition-all"
                    size={12}
                    weight="bold"
                  />
                }
              >
                {views.find((v) => v.href === pathname)?.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="p-0">
              {views.map((view) => (
                <DropdownItem
                  key={view.label}
                  href={view.href}
                  as={Link}
                  classNames={{
                    base: "rounded-md",
                    title: "text-sm",
                  }}
                  onPress={() => {
                    window.location.href = view.href;
                  }}
                  endContent={
                    view.href === pathname && (
                      <SealCheck
                        size={16}
                        weight="fill"
                        className="text-neutral-400"
                      />
                    )
                  }
                >
                  {view.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="bottom-start" className="rounded-lg p-0">
            <DropdownTrigger>
              <Button
                variant="light"
                size="sm"
                className="text-sm tracking-tight font-medium p-2"
                endContent={<CaretDown size={12} weight="bold" />}
              >
                {`${date.getDate()} ${date.toLocaleDateString("default", {
                  month: "short",
                })}`}
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="p-0">
              <DropdownItem
                key="date-selection"
                className="p-0 rounded-lg"
                isReadOnly
              >
                <Calendar
                  showMonthAndYearPickers
                  showShadow={false}
                  className="rounded-lg"
                  value={parseDate(date.toISOString().split("T")[0])}
                  onChange={(value) => {
                    setDate(new Date(value.year, value.month - 1, value.day));
                  }}
                />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="flat"
            size="sm"
            className="text-sm tracking-tight font-medium"
          >
            2 Proveedores
          </Button>
          <Button
            variant="flat"
            color="primary"
            size="sm"
            className="text-sm tracking-tight font-medium"
          >
            Nuevo agendamiento
          </Button>
        </div>
      </header>
      {children}
    </>
  );
}
