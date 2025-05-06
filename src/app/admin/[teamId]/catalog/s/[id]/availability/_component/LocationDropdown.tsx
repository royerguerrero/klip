"use client";

import { useState } from "react";
import { cn, Switch } from "@heroui/react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function LocationDropdown({ label, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="border bg-neutral-100 rounded-lg flex flex-col p-3 gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold leading-none tracking-tight">{label}</h3>
        <Switch size="sm" isSelected={isOpen} onValueChange={setIsOpen} />
      </div>
      <div
        className={cn(
          "p-3 rounded-lg bg-neutral-50",
          isOpen ? "block" : "hidden"
        )}
      >
        {children}
      </div>
    </article>
  );
}
