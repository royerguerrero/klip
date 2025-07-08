import { Team } from "../../domain/Team";
import { TeamId } from "@/contexts/organizations/domain/TeamId";

describe("Team", () => {
  describe("constructor", () => {
    it("should create a team with all properties", () => {
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174000");
      const team = new Team(teamId, "Test Team", ["read", "write"]);

      expect(team.id).toBe(teamId);
      expect(team.name).toBe("Test Team");
      expect(team.permissions).toEqual(["read", "write"]);
    });

    it("should create a team with empty permissions array", () => {
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174000");
      const team = new Team(teamId, "Test Team", []);

      expect(team.permissions).toEqual([]);
    });

    it("should create a team with single permission", () => {
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174000");
      const team = new Team(teamId, "Test Team", ["read"]);

      expect(team.permissions).toEqual(["read"]);
    });

    it("should create a team with multiple permissions", () => {
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174000");
      const team = new Team(teamId, "Test Team", ["read", "write", "delete", "admin"]);

      expect(team.permissions).toEqual(["read", "write", "delete", "admin"]);
    });
  });

  describe("toPrimitives", () => {
    it("should return primitives with all properties", () => {
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174000");
      const team = new Team(teamId, "Test Team", ["read", "write"]);

      const primitives = team.toPrimitives();

      expect(primitives).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Team",
        permissions: ["read", "write"],
      });
    });

    it("should return primitives with empty permissions", () => {
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174000");
      const team = new Team(teamId, "Test Team", []);

      const primitives = team.toPrimitives();

      expect(primitives).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Team",
        permissions: [],
      });
    });

    it("should return primitives with multiple permissions", () => {
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174000");
      const team = new Team(teamId, "Test Team", ["read", "write", "delete"]);

      const primitives = team.toPrimitives();

      expect(primitives).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Team",
        permissions: ["read", "write", "delete"],
      });
    });
  });

  describe("fromPrimitives", () => {
    it("should create team from primitives with permissions", () => {
      const primitives = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Team",
        permissions: ["read", "write"],
      };

      const team = Team.fromPrimitives(primitives);

      expect(team.id.value).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(team.name).toBe("Test Team");
      expect(team.permissions).toEqual(["read", "write"]);
    });

    it("should create team from primitives with empty permissions", () => {
      const primitives = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Team",
        permissions: [],
      };

      const team = Team.fromPrimitives(primitives);

      expect(team.id.value).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(team.name).toBe("Test Team");
      expect(team.permissions).toEqual([]);
    });

    it("should create team from primitives with multiple permissions", () => {
      const primitives = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Team",
        permissions: ["read", "write", "delete", "admin"],
      };

      const team = Team.fromPrimitives(primitives);

      expect(team.id.value).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(team.name).toBe("Test Team");
      expect(team.permissions).toEqual(["read", "write", "delete", "admin"]);
    });
  });
}); 