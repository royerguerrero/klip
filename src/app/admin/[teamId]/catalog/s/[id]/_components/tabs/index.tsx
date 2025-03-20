"use client";

import { Tab, Tabs } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import InformationTab from "./information";
import AvailabilityTab from "./availability";
import PaymentsTab from "./payments";
import OnboardingTab from "./onboarding";
import ProvidersTab from "./providers";

export default function ServiceDetailTabs() {
  const items = [
    {
      key: "information",
      title: "Información",
      content: <InformationTab />,
    },
    {
      key: "availability",
      title: "Disponibilidad",
      content: <AvailabilityTab />,
    },
    {
      key: "payments",
      title: "Pagos",
      content: <PaymentsTab />,
    },
    {
      key: "onboarding",
      title: "Preguntas",
      content: <OnboardingTab />,
    },
    {
      key: "providers",
      title: "Proveedores",
      content: <ProvidersTab />,
    },
  ];

  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(
    searchParams.get("tab") || (items[0].key as string),
  );

  return (
    <Tabs
      aria-label="Tabs Service Detail"
      variant="underlined"
      className="w-full"
      classNames={{
        tab: "w-fit",
        tabList: "border-b pb-0 w-full gap-0",
      }}
      color="primary"
      selectedKey={selected}
      onSelectionChange={(key) => setSelected(key as string)}
    >
      {items.map((item) => (
        <Tab key={item.key} title={item.title}>
          {item.content}
        </Tab>
      ))}
    </Tabs>
  );
}
