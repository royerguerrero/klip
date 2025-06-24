import { Session } from "./types";
import { countries } from "./countries";

export async function getCurrentSession(): Promise<Session> {
  return {
    user: {
      id: "1",
      name: "John Doe",
    },
    organization: {
      id: "1",
      name: "Acme Inc.",
      logo: null,
      country: countries.get("CO"),
    },
    teams: [
      {
        id: "1",
        name: "Red Team",
      },
      {
        id: "2",
        name: "Blue Team",
      },
    ],
    currentTeam: {
      id: "1",
      name: "Red Team",
    },
  };
}
