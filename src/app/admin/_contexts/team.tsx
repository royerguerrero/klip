"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

export interface Team {
  id: string;
  name: string;
}

type TeamContextType = {
  teams: Team[];
  activeTeam: Team;
  setActiveTeam: Dispatch<SetStateAction<Team>>;
};

const TeamContext = createContext<TeamContextType | null>(null);

type TeamContextProviderType = {
  children: React.ReactNode;
  teamsData: Team[];
};

export function TeamContextProvider({
  children,
  teamsData,
}: TeamContextProviderType) {
  const teams = useRef(teamsData);
  const [activeTeam, setActiveTeam] = useState(teams.current[0]);
  return (
    <TeamContext.Provider
      value={{
        teams: teams.current,
        activeTeam,
        setActiveTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeamContext() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error(
      "useTeamContext must be used inside of TeamContextProvider",
    );
  }

  return context;
}
