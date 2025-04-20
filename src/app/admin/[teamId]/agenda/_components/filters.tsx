"use client";

import { Select, SelectItem, Tabs, Tab, DatePicker } from "@heroui/react";
import { usePathname } from "next/navigation";

const providers = [
  { value: "1", label: "Dr. Smith" },
  { value: "2", label: "Dr. Johnson" },
  { value: "3", label: "Dr. Williams" },
  { value: "4", label: "Dr. Brown" },
];

export default function Filters() {
  const pathname = usePathname();

  return (
    <div className="px-3">
      <div className="flex justify-between gap-2 mb-4">
        <Select
          placeholder="Choose providers"
          items={providers}
          selectionMode="multiple"
          className="max-w-xs"
        >
          {(item) => (
            <SelectItem key={item.value} className="text-sm font-semibold">
              {item.label}
            </SelectItem>
          )}
        </Select>
        <div className="flex items-center gap-2">
          <DatePicker size="sm" />
          <Tabs size="sm" selectedKey={pathname.split("/").pop()}>
            <Tab
              key="day"
              title="Day"
              className="text-sm font-semibold"
              href="/admin/7d4bbdca-70b6-4d81-bfbb-2a7c31744395/agenda/day"
            />
            <Tab
              key="week"
              title="Week"
              className="text-xs font-semibold"
              href="/admin/7d4bbdca-70b6-4d81-bfbb-2a7c31744395/agenda/week"
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
