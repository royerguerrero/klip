import { UserCirclePlus, UserSwitch } from "@phosphor-icons/react/dist/ssr";

export const commands = [
  {
    icon: (
      <span className="p-1 rounded-lg bg-rose-200 text-rose-500">
        <UserSwitch size={18} weight="fill" />
      </span>
    ),
    name: "Cambiar de Equipo",
  },
  {
    icon: (
      <span className="p-1 rounded-lg bg-rose-200 text-rose-500">
        <UserCirclePlus size={18} weight="fill" />
      </span>
    ),
    name: "Añadir Cliente",
  },
];
