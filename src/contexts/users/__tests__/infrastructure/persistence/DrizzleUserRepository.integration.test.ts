import { DrizzleUserRepository } from "../../../infrastructure/persistence/DrizzleUserRepository";
import { User } from "../../../domain/User";
import { UserId } from "../../../domain/UserId";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";
import { users } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/users";
import {
  organizations,
  teams,
  teamMembers,
} from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/organization";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import env from "@/contexts/shared/infrastructure/env";
import { migrate } from "drizzle-orm/node-postgres/migrator";

describe("DrizzleUserRepository Integration", () => {
  let repository: DrizzleUserRepository;
  let db: NodePgDatabase;

  beforeAll(async () => {
    db = drizzle(env.TEST_DATABASE_URL, {
      logger: env.NODE_ENV === "development",
    });
    await migrate(db, {
      migrationsFolder:
        "./src/contexts/shared/infrastructure/persistence/drizzle/migrations",
    });
    repository = new DrizzleUserRepository(db);
  });

  beforeEach(async () => {
    // Clean up the database before each test
    await db.delete(teamMembers);
    await db.delete(teams);
    await db.delete(organizations);
    await db.delete(users);
  });

  afterAll(async () => {
    // Clean up after all tests
    await db.delete(teamMembers);
    await db.delete(teams);
    await db.delete(organizations);
    await db.delete(users);
  });

  describe("save", () => {
    it("should save a user to the database", async () => {
      // Arrange
      const user = new User(
        new UserId("123e4567-e89b-12d3-a456-426614174000"),
        "John",
        "Doe",
        new Email("john.doe@example.com"),
        "hashedPassword",
        "salt"
      );

      // Act
      await repository.save(user);

      // Assert
      const savedUsers = await db.select().from(users);
      expect(savedUsers).toHaveLength(1);
      expect(savedUsers[0].id).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(savedUsers[0].firstName).toBe("John");
      expect(savedUsers[0].lastName).toBe("Doe");
      expect(savedUsers[0].email).toBe("john.doe@example.com");
      expect(savedUsers[0].password).toBe("hashedPassword");
      expect(savedUsers[0].salt).toBe("salt");
    });

    it("should save multiple users to the database", async () => {
      // Arrange
      const user1 = new User(
        new UserId("123e4567-e89b-12d3-a456-426614174000"),
        "John",
        "Doe",
        new Email("john.doe@example.com"),
        "hashedPassword1",
        "salt1"
      );

      const user2 = new User(
        new UserId("987fcdeb-51a2-43d1-b789-123456789abc"),
        "Jane",
        "Smith",
        new Email("jane.smith@example.com"),
        "hashedPassword2",
        "salt2"
      );

      // Act
      await repository.save(user1);
      await repository.save(user2);

      // Assert
      const savedUsers = await db.select().from(users);
      expect(savedUsers).toHaveLength(2);

      const johnUser = savedUsers.find((u) => u.firstName === "John");
      const janeUser = savedUsers.find((u) => u.firstName === "Jane");

      expect(johnUser).toBeDefined();
      expect(janeUser).toBeDefined();
      expect(johnUser?.email).toBe("john.doe@example.com");
      expect(janeUser?.email).toBe("jane.smith@example.com");
    });
  });

  describe("matching", () => {
    describe("users without organization", () => {
      beforeEach(async () => {
        // Setup test data - users without any organization
        const user1 = new User(
          new UserId("123e4567-e89b-12d3-a456-426614174000"),
          "John",
          "Doe",
          new Email("john.doe@example.com"),
          "hashedPassword1",
          "salt1"
        );

        const user2 = new User(
          new UserId("987fcdeb-51a2-43d1-b789-123456789abc"),
          "Jane",
          "Smith",
          new Email("jane.smith@example.com"),
          "hashedPassword2",
          "salt2"
        );

        await repository.save(user1);
        await repository.save(user2);
      });

      it("should find user by email when user has no organization", async () => {
        // Arrange
        const criteria = new Criteria([
          new Filter("email", Operator.EQUAL, "john.doe@example.com"),
        ]);

        // Act
        const results = await repository.matching(criteria);

        // Assert
        expect(results).toHaveLength(1);
        expect(results[0].email.value).toBe("john.doe@example.com");
        expect(results[0].firstName).toBe("John");
        expect(results[0].lastName).toBe("Doe");
        expect(results[0].organization).toBeUndefined();
      });

      it("should return empty array when no user matches email", async () => {
        // Arrange
        const criteria = new Criteria([
          new Filter("email", Operator.EQUAL, "nonexistent@example.com"),
        ]);

        // Act
        const results = await repository.matching(criteria);

        // Assert
        expect(results).toHaveLength(0);
      });

      it("should return all users when no criteria provided", async () => {
        // Arrange
        const criteria = new Criteria([]);

        // Act
        const results = await repository.matching(criteria);

        // Assert
        expect(results).toHaveLength(2);
        const emails = results.map((u) => u.email.value);
        expect(emails).toContain("john.doe@example.com");
        expect(emails).toContain("jane.smith@example.com");
        results.forEach((user) => {
          expect(user.organization).toBeUndefined();
        });
      });
    });

    describe("users with organization and single team", () => {
      let orgId: string;
      let teamId: string;

      beforeEach(async () => {
        // Create organization
        const [org] = await db
          .insert(organizations)
          .values({
            name: "Test Organization",
            country: "AR",
          })
          .returning();
        orgId = org.id;

        // Create team
        const [team] = await db
          .insert(teams)
          .values({
            name: "Development Team",
            organizationId: orgId,
          })
          .returning();
        teamId = team.id;

        // Create user
        const user = new User(
          new UserId("123e4567-e89b-12d3-a456-426614174000"),
          "John",
          "Doe",
          new Email("john.doe@example.com"),
          "hashedPassword1",
          "salt1"
        );

        await repository.save(user);

        // Add user to team
        await db.insert(teamMembers).values({
          teamId,
          userId: "123e4567-e89b-12d3-a456-426614174000",
          permissions: ["read", "write"],
        });
      });

      it("should find user with organization and single team", async () => {
        // Arrange
        const criteria = new Criteria([
          new Filter("email", Operator.EQUAL, "john.doe@example.com"),
        ]);

        // Act
        const results = await repository.matching(criteria);

        // Assert
        expect(results).toHaveLength(1);
        expect(results[0].email.value).toBe("john.doe@example.com");
        expect(results[0].organization).toBeDefined();
        expect(results[0].organization?.name).toBe("Test Organization");
        expect(results[0].organization?.country).toBe("AR");
        expect(results[0].organization?.teams).toHaveLength(1);
        expect(results[0].organization?.teams[0].name).toBe("Development Team");
        expect(results[0].organization?.teams[0].permissions).toEqual([
          "read",
          "write",
        ]);
      });
    });

    describe("users with organization and multiple teams", () => {
      let orgId: string;
      let team1Id: string;
      let team2Id: string;

      beforeEach(async () => {
        // Create organization
        const [org] = await db
          .insert(organizations)
          .values({
            name: "Test Organization",
            country: "AR",
          })
          .returning();
        orgId = org.id;

        // Create teams
        const [team1] = await db
          .insert(teams)
          .values({
            name: "Development Team",
            organizationId: orgId,
          })
          .returning();
        team1Id = team1.id;

        const [team2] = await db
          .insert(teams)
          .values({
            name: "QA Team",
            organizationId: orgId,
          })
          .returning();
        team2Id = team2.id;

        // Create user
        const user = new User(
          new UserId("123e4567-e89b-12d3-a456-426614174000"),
          "John",
          "Doe",
          new Email("john.doe@example.com"),
          "hashedPassword1",
          "salt1"
        );

        await repository.save(user);

        // Add user to both teams
        await db.insert(teamMembers).values([
          {
            teamId: team1Id,
            userId: "123e4567-e89b-12d3-a456-426614174000",
            permissions: ["read", "write"],
          },
          {
            teamId: team2Id,
            userId: "123e4567-e89b-12d3-a456-426614174000",
            permissions: ["read"],
          },
        ]);
      });

      it("should find user with organization and multiple teams", async () => {
        // Arrange
        const criteria = new Criteria([
          new Filter("email", Operator.EQUAL, "john.doe@example.com"),
        ]);

        // Act
        const results = await repository.matching(criteria);

        // Assert
        expect(results).toHaveLength(1);
        expect(results[0].email.value).toBe("john.doe@example.com");
        expect(results[0].organization).toBeDefined();
        expect(results[0].organization?.name).toBe("Test Organization");
        expect(results[0].organization?.teams).toHaveLength(2);

        const teamNames = results[0].organization?.teams.map((t) => t.name);
        expect(teamNames).toContain("Development Team");
        expect(teamNames).toContain("QA Team");

        const devTeam = results[0].organization?.teams.find(
          (t) => t.name === "Development Team"
        );
        const qaTeam = results[0].organization?.teams.find(
          (t) => t.name === "QA Team"
        );

        expect(devTeam?.permissions).toEqual(["read", "write"]);
        expect(qaTeam?.permissions).toEqual(["read"]);
      });
    });

    describe("mixed scenarios - users with and without organizations", () => {
      let orgId: string;
      let teamId: string;

      beforeEach(async () => {
        // Create organization and team
        const [org] = await db
          .insert(organizations)
          .values({
            name: "Test Organization",
            country: "AR",
          })
          .returning();
        orgId = org.id;

        const [team] = await db
          .insert(teams)
          .values({
            name: "Development Team",
            organizationId: orgId,
          })
          .returning();
        teamId = team.id;

        // Create user with organization
        const userWithOrg = new User(
          new UserId("123e4567-e89b-12d3-a456-426614174000"),
          "John",
          "Doe",
          new Email("john.doe@example.com"),
          "hashedPassword1",
          "salt1"
        );

        // Create user without organization
        const userWithoutOrg = new User(
          new UserId("987fcdeb-51a2-43d1-b789-123456789abc"),
          "Jane",
          "Smith",
          new Email("jane.smith@example.com"),
          "hashedPassword2",
          "salt2"
        );

        await repository.save(userWithOrg);
        await repository.save(userWithoutOrg);

        // Add first user to team
        await db.insert(teamMembers).values({
          teamId,
          userId: "123e4567-e89b-12d3-a456-426614174000",
          permissions: ["read", "write"],
        });
      });

      it("should return all users with correct organization data", async () => {
        // Arrange
        const criteria = new Criteria([]);

        // Act
        const results = await repository.matching(criteria);

        // Assert
        expect(results).toHaveLength(2);

        const johnUser = results.find((u) => u.firstName === "John");
        const janeUser = results.find((u) => u.firstName === "Jane");

        expect(johnUser).toBeDefined();
        expect(janeUser).toBeDefined();

        expect(johnUser?.organization).toBeDefined();
        expect(johnUser?.organization?.name).toBe("Test Organization");
        expect(johnUser?.organization?.teams).toHaveLength(1);

        expect(janeUser?.organization).toBeUndefined();
      });
    });
  });

  describe("round trip", () => {
    it("should save and retrieve user correctly", async () => {
      // Arrange
      const originalUser = new User(
        new UserId("123e4567-e89b-12d3-a456-426614174000"),
        "John",
        "Doe",
        new Email("john.doe@example.com"),
        "hashedPassword",
        "salt"
      );

      // Act
      await repository.save(originalUser);

      const criteria = new Criteria([
        new Filter("email", Operator.EQUAL, "john.doe@example.com"),
      ]);
      const retrievedUsers = await repository.matching(criteria);

      // Assert
      expect(retrievedUsers).toHaveLength(1);
      const retrievedUser = retrievedUsers[0];

      expect(retrievedUser.id.value).toBe(originalUser.id.value);
      expect(retrievedUser.firstName).toBe(originalUser.firstName);
      expect(retrievedUser.lastName).toBe(originalUser.lastName);
      expect(retrievedUser.email.value).toBe(originalUser.email.value);
      expect(retrievedUser.password).toBe(originalUser.password);
      expect(retrievedUser.salt).toBe(originalUser.salt);
    });
  });
});
