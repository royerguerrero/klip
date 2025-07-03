import { Organization } from "../../domain/Organization";
import { OrganizationId } from "@/contexts/organizations/domain/OrganizationId";
import { Team } from "../../domain/Team";
import { TeamId } from "@/contexts/organizations/domain/TeamId";

describe("Organization", () => {
  describe("constructor", () => {
    it("should create an organization with all properties", () => {
      const organizationId = new OrganizationId("123e4567-e89b-12d3-a456-426614174000");
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174001");
      const team = new Team(teamId, "Team A", ["read", "write"]);
      const organization = new Organization(
        organizationId,
        "Test Organization",
        "logo.png",
        "US",
        [team]
      );

      expect(organization.id).toBe(organizationId);
      expect(organization.name).toBe("Test Organization");
      expect(organization.logo).toBe("logo.png");
      expect(organization.country).toBe("US");
      expect(organization.teams).toEqual([team]);
    });

    it("should create an organization with empty teams array", () => {
      const organizationId = new OrganizationId("123e4567-e89b-12d3-a456-426614174000");
      const organization = new Organization(
        organizationId,
        "Test Organization",
        "logo.png",
        "US",
        []
      );

      expect(organization.teams).toEqual([]);
    });

    it("should create an organization with multiple teams", () => {
      const organizationId = new OrganizationId("123e4567-e89b-12d3-a456-426614174000");
      const team1Id = new TeamId("123e4567-e89b-12d3-a456-426614174001");
      const team2Id = new TeamId("123e4567-e89b-12d3-a456-426614174002");
      const team1 = new Team(team1Id, "Team A", ["read"]);
      const team2 = new Team(team2Id, "Team B", ["write"]);
      const organization = new Organization(
        organizationId,
        "Test Organization",
        "logo.png",
        "US",
        [team1, team2]
      );

      expect(organization.teams).toHaveLength(2);
      expect(organization.teams[0].name).toBe("Team A");
      expect(organization.teams[1].name).toBe("Team B");
    });
  });

  describe("toPrimitives", () => {
    it("should return primitives with all properties", () => {
      const organizationId = new OrganizationId("123e4567-e89b-12d3-a456-426614174000");
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174001");
      const team = new Team(teamId, "Team A", ["read", "write"]);
      const organization = new Organization(
        organizationId,
        "Test Organization",
        "logo.png",
        "US",
        [team]
      );

      const primitives = organization.toPrimitives();

      expect(primitives).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Organization",
        logo: "logo.png",
        country: "US",
        teams: [
          {
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Team A",
            permissions: ["read", "write"],
          },
        ],
      });
    });

    it("should return primitives with empty teams array", () => {
      const organizationId = new OrganizationId("123e4567-e89b-12d3-a456-426614174000");
      const organization = new Organization(
        organizationId,
        "Test Organization",
        "logo.png",
        "US",
        []
      );

      const primitives = organization.toPrimitives();

      expect(primitives).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Organization",
        logo: "logo.png",
        country: "US",
        teams: [],
      });
    });

    it("should return primitives with multiple teams", () => {
      const organizationId = new OrganizationId("123e4567-e89b-12d3-a456-426614174000");
      const team1Id = new TeamId("123e4567-e89b-12d3-a456-426614174001");
      const team2Id = new TeamId("123e4567-e89b-12d3-a456-426614174002");
      const team1 = new Team(team1Id, "Team A", ["read"]);
      const team2 = new Team(team2Id, "Team B", ["write"]);
      const organization = new Organization(
        organizationId,
        "Test Organization",
        "logo.png",
        "US",
        [team1, team2]
      );

      const primitives = organization.toPrimitives();

      expect(primitives.teams).toHaveLength(2);
      expect(primitives.teams[0]).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174001",
        name: "Team A",
        permissions: ["read"],
      });
      expect(primitives.teams[1]).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174002",
        name: "Team B",
        permissions: ["write"],
      });
    });
  });

  describe("fromPrimitives", () => {
    it("should create organization from primitives with teams", () => {
      const primitives = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Organization",
        logo: "logo.png",
        country: "US",
        teams: [
          {
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Team A",
            permissions: ["read", "write"],
          },
        ],
      };

      const organization = Organization.fromPrimitives(primitives);

      expect(organization.id.value).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(organization.name).toBe("Test Organization");
      expect(organization.logo).toBe("logo.png");
      expect(organization.country).toBe("US");
      expect(organization.teams).toHaveLength(1);
      expect(organization.teams[0].name).toBe("Team A");
      expect(organization.teams[0].permissions).toEqual(["read", "write"]);
    });

    it("should create organization from primitives with empty teams", () => {
      const primitives = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Organization",
        logo: "logo.png",
        country: "US",
        teams: [],
      };

      const organization = Organization.fromPrimitives(primitives);

      expect(organization.id.value).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(organization.name).toBe("Test Organization");
      expect(organization.logo).toBe("logo.png");
      expect(organization.country).toBe("US");
      expect(organization.teams).toEqual([]);
    });

    it("should create organization from primitives with multiple teams", () => {
      const primitives = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Organization",
        logo: "logo.png",
        country: "US",
        teams: [
          {
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Team A",
            permissions: ["read"],
          },
          {
            id: "123e4567-e89b-12d3-a456-426614174002",
            name: "Team B",
            permissions: ["write"],
          },
        ],
      };

      const organization = Organization.fromPrimitives(primitives);

      expect(organization.teams).toHaveLength(2);
      expect(organization.teams[0].name).toBe("Team A");
      expect(organization.teams[0].permissions).toEqual(["read"]);
      expect(organization.teams[1].name).toBe("Team B");
      expect(organization.teams[1].permissions).toEqual(["write"]);
    });
  });
}); 