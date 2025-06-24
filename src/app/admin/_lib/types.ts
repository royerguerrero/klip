import { Country } from "./countries";

export type User = {
  id: string;
  name: string;
};

export type Organization = {
  id: string;
  name: string;
  logo: string | null;
  country: Country;
};

export type Team = {
  id: string;
  name: string;
};

export type Session = {
  user: User;
  organization: Organization;
  teams: Team[];
  currentTeam: Team | null;
};
