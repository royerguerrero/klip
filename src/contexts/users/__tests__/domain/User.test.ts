import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { Password } from "@/contexts/shared/domain/value-object/Password";
import { InvalidPasswordError } from "@/contexts/shared/domain/errors/InvalidPasswordError";
import { Organization } from "../../domain/Organization";
import { OrganizationId } from "@/contexts/organizations/domain/OrganizationId";
import { Team } from "../../domain/Team";
import { TeamId } from "@/contexts/organizations/domain/TeamId";

// Mock PasswordHasher for testing
const mockPasswordHasher = {
  hash: jest.fn(),
  compare: jest.fn(),
  generateSalt: jest.fn(),
};

describe("User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create a user with all required properties", () => {
      const userId = new UserId("123e4567-e89b-12d3-a456-426614174000");
      const email = new Email("test@example.com");
      const user = new User(
        userId,
        "John",
        "Doe",
        email,
        "hashedPassword",
        "salt"
      );

      expect(user.id).toBe(userId);
      expect(user.firstName).toBe("John");
      expect(user.lastName).toBe("Doe");
      expect(user.email).toBe(email);
      expect(user.password).toBe("hashedPassword");
      expect(user.salt).toBe("salt");
      expect(user.organization).toBeUndefined();
    });

    it("should create a user with organization", () => {
      const userId = new UserId("123e4567-e89b-12d3-a456-426614174000");
      const email = new Email("test@example.com");
      const organizationId = new OrganizationId("123e4567-e89b-12d3-a456-426614174001");
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174002");
      const team = new Team(teamId, "Team A", ["read", "write"]);
      const organization = new Organization(
        organizationId,
        "Test Org",
        "logo.png",
        "US",
        [team]
      );

      const user = new User(
        userId,
        "John",
        "Doe",
        email,
        "hashedPassword",
        "salt",
        organization
      );

      expect(user.organization).toBe(organization);
    });
  });

  describe("register", () => {
    it("should create a new user with hashed password", async () => {
      const userId = "123e4567-e89b-12d3-a456-426614174000";
      const email = "test@example.com";
      const password = "password123";
      const hashedPassword = "hashedPassword123";
      const salt = "generatedSalt";

      mockPasswordHasher.generateSalt.mockReturnValue(salt);
      mockPasswordHasher.hash.mockResolvedValue({
        hashedPassword,
        salt,
      });

      const user = await User.register({
        id: userId,
        firstName: "John",
        lastName: "Doe",
        email,
        password,
        organization: undefined,
        passwordHasher: mockPasswordHasher as any,
      });

      expect(user.id.value).toBe(userId);
      expect(user.firstName).toBe("John");
      expect(user.lastName).toBe("Doe");
      expect(user.email.value).toBe(email);
      expect(user.password).toBe(hashedPassword);
      expect(user.salt).toBe(salt);
      expect(user.organization).toBeUndefined();

      expect(mockPasswordHasher.generateSalt).toHaveBeenCalled();
      expect(mockPasswordHasher.hash).toHaveBeenCalledWith(
        new Password(password),
        salt
      );
    });
  });

  describe("authenticate", () => {
    it("should authenticate user with correct password", async () => {
      const user = new User(
        new UserId("123e4567-e89b-12d3-a456-426614174000"),
        "John",
        "Doe",
        new Email("test@example.com"),
        "hashedPassword",
        "salt"
      );

      mockPasswordHasher.compare.mockResolvedValue(true);

      await expect(
        user.authenticate({
          password: "correctPassword",
          passwordHasher: mockPasswordHasher as any,
        })
      ).resolves.not.toThrow();

      expect(mockPasswordHasher.compare).toHaveBeenCalledWith(
        new Password("correctPassword"),
        "hashedPassword",
        "salt"
      );
    });

    it("should throw InvalidPasswordError with incorrect password", async () => {
      const user = new User(
        new UserId("123e4567-e89b-12d3-a456-426614174000"),
        "John",
        "Doe",
        new Email("test@example.com"),
        "hashedPassword",
        "salt"
      );

      mockPasswordHasher.compare.mockResolvedValue(false);

      await expect(
        user.authenticate({
          password: "wrongPassword",
          passwordHasher: mockPasswordHasher as any,
        })
      ).rejects.toThrow(InvalidPasswordError);

      expect(mockPasswordHasher.compare).toHaveBeenCalledWith(
        new Password("wrongPassword"),
        "hashedPassword",
        "salt"
      );
    });
  });

  describe("toPrimitives", () => {
    it("should return primitives without organization", () => {
      const user = new User(
        new UserId("123e4567-e89b-12d3-a456-426614174000"),
        "John",
        "Doe",
        new Email("test@example.com"),
        "hashedPassword",
        "salt"
      );

      const primitives = user.toPrimitives();

      expect(primitives).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        password: "hashedPassword",
        salt: "salt",
        organization: undefined,
      });
    });

    it("should return primitives with organization", () => {
      const organizationId = new OrganizationId("123e4567-e89b-12d3-a456-426614174001");
      const teamId = new TeamId("123e4567-e89b-12d3-a456-426614174002");
      const team = new Team(teamId, "Team A", ["read", "write"]);
      const organization = new Organization(
        organizationId,
        "Test Org",
        "logo.png",
        "US",
        [team]
      );

      const user = new User(
        new UserId("123e4567-e89b-12d3-a456-426614174000"),
        "John",
        "Doe",
        new Email("test@example.com"),
        "hashedPassword",
        "salt",
        organization
      );

      const primitives = user.toPrimitives();

      expect(primitives).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        password: "hashedPassword",
        salt: "salt",
        organization: {
          id: "123e4567-e89b-12d3-a456-426614174001",
          name: "Test Org",
          logo: "logo.png",
          country: "US",
          teams: [
            {
              id: "123e4567-e89b-12d3-a456-426614174002",
              name: "Team A",
              permissions: ["read", "write"],
            },
          ],
        },
      });
    });
  });

  describe("fromPrimitives", () => {
    it("should create user from primitives without organization", () => {
      const primitives = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        password: "hashedPassword",
        salt: "salt",
        organization: undefined,
      };

      const user = User.fromPrimitives(primitives);

      expect(user.id.value).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(user.firstName).toBe("John");
      expect(user.lastName).toBe("Doe");
      expect(user.email.value).toBe("test@example.com");
      expect(user.password).toBe("hashedPassword");
      expect(user.salt).toBe("salt");
      expect(user.organization).toBeUndefined();
    });

    it("should create user from primitives with organization", () => {
      const primitives = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        password: "hashedPassword",
        salt: "salt",
        organization: {
          id: "123e4567-e89b-12d3-a456-426614174001",
          name: "Test Org",
          logo: "logo.png",
          country: "US",
          teams: [
            {
              id: "123e4567-e89b-12d3-a456-426614174002",
              name: "Team A",
              permissions: ["read", "write"],
            },
          ],
        },
      };

      const user = User.fromPrimitives(primitives);

      expect(user.id.value).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(user.firstName).toBe("John");
      expect(user.lastName).toBe("Doe");
      expect(user.email.value).toBe("test@example.com");
      expect(user.password).toBe("hashedPassword");
      expect(user.salt).toBe("salt");
      expect(user.organization).toBeInstanceOf(Organization);
      expect(user.organization?.name).toBe("Test Org");
      expect(user.organization?.teams).toHaveLength(1);
      expect(user.organization?.teams[0].name).toBe("Team A");
    });
  });
}); 