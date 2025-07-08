"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { Session, User, Organization, Team } from "@/app/admin/_lib/types";

type SessionContextType = {
  session: Session;
  setSession: (session: Session) => void;
  updateUser: (user: User) => void;
  updateOrganization: (organization: Organization | null) => void;
  updateTeams: (teams: Team[] | null) => void;
  updateCurrentTeam: (team: Team | null) => void;
  clearSession: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function CurrentSessionProvider({
  children,
  currentSession,
}: {
  children: ReactNode;
  currentSession: Session;
}) {
  const [session, setSession] = useState<Session>(currentSession);

  const updateUser = (user: User) => {
    setSession((prev) => ({ ...prev, user }));
  };

  const updateOrganization = (organization: Organization | null) => {
    setSession((prev) => ({ ...prev, organization }));
  };

  const updateTeams = (teams: Team[] | null) => {
    setSession((prev) => ({
      ...prev,
      organization: prev.organization
        ? { ...prev.organization, teams }
        : null,
    }));
  };

  const updateCurrentTeam = (team: Team | null) => {
    setSession((prev) => ({
      ...prev,
      organization: prev.organization
        ? { ...prev.organization, currentTeam: team }
        : null,
    }));
  };

  const clearSession = () => {
    setSession(currentSession);
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        updateUser,
        updateOrganization,
        updateTeams,
        updateCurrentTeam,
        clearSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useCurrentSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentSession must be used within a CurrentSessionProvider"
    );
  }
  return context;
}
