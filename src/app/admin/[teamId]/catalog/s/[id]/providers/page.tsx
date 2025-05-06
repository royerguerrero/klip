"use client";

import { Switch, User } from "@heroui/react";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr";
import Heading from "../_components/heading";

export default function Page() {
  const teamMembers = [
    {
      id: "1",
      name: "Elon Musk",
      avatar: "https://github.com/elonmusk.png",
      email: "juan.perez@example.com",
      phone: "+54 9 11 3333-4444",
      isEnabled: true,
    },
    {
      id: "2",
      name: "Roberto Gomez",
      email: "roberto.gomez@example.com",
      phone: "+54 9 11 3333-4444",
      isEnabled: false,
    },
  ];

  return (
    <>
      <Heading
        title="Proveedores"
        description="Habilita los proveedores que pueden ser seleccionados para este servicio."
      />
      <div className="flex flex-col gap-3 px-3">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-2 justify-between"
          >
            <User
              avatarProps={{
                src: member.avatar,
                classNames: {
                  base: "bg-neutral-200",
                  icon: "text-neutral-400",
                },
                icon: <UserIcon size={14} weight="fill" />,
                className: "w-7 h-7",
              }}
              name={member.name}
              classNames={{
                name: "whitespace-nowrap font-medium tracking-tight text-sm",
              }}
            />
            <Switch size="sm" isSelected={member.isEnabled} />
          </div>
        ))}
      </div>
    </>
  );
}
