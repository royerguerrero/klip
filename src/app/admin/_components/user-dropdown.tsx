"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { User } from "@phosphor-icons/react/dist/ssr";
import { deauthenticate } from "@/app/auth/_lib/actions";

export default function UserDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          classNames={{
            base: "bg-neutral-200 rounded-xl",
            icon: "text-neutral-400",
          }}
          icon={<User size={20} weight="fill" />}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="delete"
          as="button"
          className="text-danger"
          color="danger"
          onPress={() => deauthenticate()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
