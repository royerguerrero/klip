import { UserAuthenticator } from "../../application/UserAuthenticator";
import { UserRepository } from "../../domain/UserRepository";
import { PasswordHasher } from "@/contexts/shared/domain/PasswordHasher";
import { User } from "../../domain/User";
import { UserDoesNotExistError } from "../../domain/errors/UserDoesNotExistError";
import { InvalidPasswordError } from "@/contexts/shared/domain/errors/InvalidPasswordError";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";

// Mock dependencies
const mockUserRepository: jest.Mocked<UserRepository> = {
  save: jest.fn(),
  matching: jest.fn(),
};

const mockPasswordHasher: jest.Mocked<PasswordHasher> = {
  hash: jest.fn(),
  compare: jest.fn(),
  generateSalt: jest.fn(),
};

describe("UserAuthenticator", () => {
  let userAuthenticator: UserAuthenticator;

  beforeEach(() => {
    jest.clearAllMocks();
    userAuthenticator = new UserAuthenticator(mockUserRepository, mockPasswordHasher);
  });

  describe("authenticate", () => {
    const validCredentials = {
      email: "john.doe@example.com",
      password: "password123",
    };

    const mockUser = {
      id: { value: "123e4567-e89b-12d3-a456-426614174000" },
      firstName: "John",
      lastName: "Doe",
      email: { value: validCredentials.email },
      password: "hashedPassword",
      salt: "salt",
      authenticate: jest.fn(),
      toPrimitives: jest.fn(),
    } as any;

    it("should successfully authenticate a user with valid credentials", async () => {
      // Arrange
      mockUserRepository.matching.mockResolvedValue([mockUser]);
      mockUser.authenticate.mockResolvedValue(undefined);

      // Act
      const result = await userAuthenticator.authenticate(
        validCredentials.email,
        validCredentials.password
      );

      // Assert
      expect(result.error).toBeNull();
      expect(result.user).toBe(mockUser);
      expect(mockUserRepository.matching).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            new Filter("email", Operator.EQUAL, validCredentials.email),
          ],
        })
      );
      expect(mockUser.authenticate).toHaveBeenCalledWith({
        password: validCredentials.password,
        passwordHasher: mockPasswordHasher,
      });
    });

    it("should return error when user does not exist", async () => {
      // Arrange
      mockUserRepository.matching.mockResolvedValue([]);

      // Act
      const result = await userAuthenticator.authenticate(
        validCredentials.email,
        validCredentials.password
      );

      // Assert
      expect(result.error).toBeInstanceOf(UserDoesNotExistError);
      expect(result.user).toBeNull();
      expect(mockUserRepository.matching).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            new Filter("email", Operator.EQUAL, validCredentials.email),
          ],
        })
      );
    });

    it("should return error when multiple users found with same email", async () => {
      // Arrange
      const mockUser2 = {
        ...mockUser,
        id: { value: "987fcdeb-51a2-43d1-b789-123456789abc" },
      };
      mockUserRepository.matching.mockResolvedValue([mockUser, mockUser2]);

      // Act
      const result = await userAuthenticator.authenticate(
        validCredentials.email,
        validCredentials.password
      );

      // Assert
      expect(result.error).toBeInstanceOf(UserDoesNotExistError);
      expect(result.user).toBeNull();
      expect(mockUserRepository.matching).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            new Filter("email", Operator.EQUAL, validCredentials.email),
          ],
        })
      );
    });

    it("should propagate authentication errors from user", async () => {
      // Arrange
      const authError = new InvalidPasswordError();
      mockUserRepository.matching.mockResolvedValue([mockUser]);
      mockUser.authenticate.mockRejectedValue(authError);

      // Act & Assert
      await expect(
        userAuthenticator.authenticate(
          validCredentials.email,
          validCredentials.password
        )
      ).rejects.toThrow(InvalidPasswordError);

      expect(mockUserRepository.matching).toHaveBeenCalled();
      expect(mockUser.authenticate).toHaveBeenCalledWith({
        password: validCredentials.password,
        passwordHasher: mockPasswordHasher,
      });
    });

    it("should handle repository errors during user search", async () => {
      // Arrange
      const repositoryError = new Error("Database connection failed");
      mockUserRepository.matching.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(
        userAuthenticator.authenticate(
          validCredentials.email,
          validCredentials.password
        )
      ).rejects.toThrow("Database connection failed");

      expect(mockUserRepository.matching).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            new Filter("email", Operator.EQUAL, validCredentials.email),
          ],
        })
      );
    });

    it("should create criteria with correct email filter", async () => {
      // Arrange
      mockUserRepository.matching.mockResolvedValue([mockUser]);
      mockUser.authenticate.mockResolvedValue(undefined);

      // Act
      await userAuthenticator.authenticate(
        validCredentials.email,
        validCredentials.password
      );

      // Assert
      expect(mockUserRepository.matching).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            new Filter("email", Operator.EQUAL, validCredentials.email),
          ],
        })
      );
    });

    it("should pass correct parameters to user authenticate method", async () => {
      // Arrange
      mockUserRepository.matching.mockResolvedValue([mockUser]);
      mockUser.authenticate.mockResolvedValue(undefined);

      // Act
      await userAuthenticator.authenticate(
        validCredentials.email,
        validCredentials.password
      );

      // Assert
      expect(mockUser.authenticate).toHaveBeenCalledWith({
        password: validCredentials.password,
        passwordHasher: mockPasswordHasher,
      });
    });
  });
}); 