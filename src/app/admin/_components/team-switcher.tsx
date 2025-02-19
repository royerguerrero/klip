"use client";

import { Select, SelectItem } from "@heroui/react";
import { CaretUpDown } from "@phosphor-icons/react/dist/ssr";
import { useTeamContext } from "../_contexts/team";

export default function TeamSwitcher() {
  const { teams, activeTeam, setActiveTeam } = useTeamContext();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const team = teams.find((team) => team.id === e.target.value);
    const prevTeam = activeTeam;
    setActiveTeam(team || activeTeam);

    if (window.location.pathname.startsWith(`/admin/${prevTeam}`)) {
      console.log("Redirect the ");
    }
  };

  return (
    teams.length > 1 && (
      <Select
        disableSelectorIconRotation
        label="Equipo"
        size="sm"
        placeholder="Seleccionar equipo"
        selectorIcon={<CaretUpDown size={16} />}
        onChange={handleOnChange}
        defaultSelectedKeys={[activeTeam.id]}
      >
        {teams.map((team) => (
          <SelectItem
            key={team.id}
            value={team.id}
            className="font-medium tracking-tight"
          >
            {team.name}
          </SelectItem>
        ))}
      </Select>
    )
  );
}
