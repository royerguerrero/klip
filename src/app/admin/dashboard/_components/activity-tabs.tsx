"use client";

import { Tabs, Tab } from "@heroui/react";
import React from "react";
import TransactionsTable from "./transactions-table";
import ClientsTable from "./clients-table";

export default function ActivityTabs() {
  return (
    <Tabs
      aria-label="Activity Tabs"
      variant="underlined"
      color="primary"
      classNames={{
        base: "w-full",
        tab: "w-fit font-semibold tracking-tight py-5",
        tabList: "w-full relative rounded-none p-0 border-b border-divider",
        panel: "px-3",
        cursor: "bg-primary/70",
        tabContent: "group-data-[selected=true]:text-primary/70 text-neutral-400 py-4"
      }}
    >
      <Tab key="transactions" title={"Transacciones"}>
        <TransactionsTable />
      </Tab>
      <Tab key="customers" title={"Clientes"}>
        <ClientsTable />
      </Tab>
    </Tabs>
  );
}
