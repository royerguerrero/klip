import { UserRegister } from "../../application/UserRegister";
import { UserRepository } from "../../domain/UserRepository";
import { PasswordHasher } from "@/contexts/shared/domain/PasswordHasher";
import { User } from "../../domain/User";
import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExits";
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

describe("UserRegister", () => {
  let userRegister: UserRegister;

  beforeEach(() => {
    jest.clearAllMocks();
    userRegister = new UserRegister(mockUserRepository, mockPasswordHasher);
  });

  describe("register", () => {
    const validRegistrationParams = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      organization: undefined,
    };

    it("should successfully register a new user", async () => {
      // Arrange
      const hashedPassword = "hashedPassword123";
      const salt = "generatedSalt";
      const mockUser = {
        id: { value: validRegistrationParams.id },
        firstName: validRegistrationParams.firstName,
        lastName: validRegistrationParams.lastName,
        email: { value: validRegistrationParams.email },
        password: hashedPassword,
        salt,
        organization: undefined,
      } as User;

      mockUserRepository.matching.mockResolvedValue([]);
      mockPasswordHasher.generateSalt.mockReturnValue(salt);
      mockPasswordHasher.hash.mockResolvedValue({
        hashedPassword,
        salt,
      });

      // Act
      const result = await userRegister.register(validRegistrationParams);

      // Assert
      expect(result.error).toBeNull();
      expect(result.user).toBeDefined();
      expect(mockUserRepository.matching).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            new Filter("email", Operator.EQUAL, validRegistrationParams.email),
          ],
        })
      );
      expect(mockPasswordHasher.generateSalt).toHaveBeenCalled();
      expect(mockPasswordHasher.hash).toHaveBeenCalled();
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: { value: validRegistrationParams.id },
          firstName: validRegistrationParams.firstName,
          lastName: validRegistrationParams.lastName,
          email: { value: validRegistrationParams.email },
        })
      );
    });

    it("should return error when user already exists", async () => {
      // Arrange
      const existingUser = {
        id: { value: "existing-id" },
        firstName: "Existing",
        lastName: "User",
        email: { value: validRegistrationParams.email },
        password: "hashedPassword",
        salt: "salt",
      } as User;

      mockUserRepository.matching.mockResolvedValue([existingUser]);

      // Act
      const result = await userRegister.register(validRegistrationParams);

      // Assert
      expect(result.error).toBeInstanceOf(UserAlreadyExistsError);
      expect(result.user).toBeNull();
      expect(mockUserRepository.matching).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            new Filter("email", Operator.EQUAL, validRegistrationParams.email),
          ],
        })
      );
      expect(mockPasswordHasher.generateSalt).not.toHaveBeenCalled();
      expect(mockPasswordHasher.hash).not.toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it("should handle repository errors during user search", async () => {
      // Arrange
      const repositoryError = new Error("Database connection failed");
      mockUserRepository.matching.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(
        userRegister.register(validRegistrationParams)
      ).rejects.toThrow("Database connection failed");

      expect(mockUserRepository.matching).toHaveBeenCalled();
      expect(mockPasswordHasher.generateSalt).not.toHaveBeenCalled();
      expect(mockPasswordHasher.hash).not.toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it("should handle password hashing errors", async () => {
      // Arrange
      const hashingError = new Error("Password hashing failed");
      mockUserRepository.matching.mockResolvedValue([]);
      mockPasswordHasher.generateSalt.mockReturnValue("salt");
      mockPasswordHasher.hash.mockRejectedValue(hashingError);

      // Act & Assert
      await expect(
        userRegister.register(validRegistrationParams)
      ).rejects.toThrow("Password hashing failed");

      expect(mockUserRepository.matching).toHaveBeenCalled();
      expect(mockPasswordHasher.generateSalt).toHaveBeenCalled();
      expect(mockPasswordHasher.hash).toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it("should create criteria with correct email filter", async () => {
      // Arrange
      mockUserRepository.matching.mockResolvedValue([]);
      mockPasswordHasher.generateSalt.mockReturnValue("salt");
      mockPasswordHasher.hash.mockResolvedValue({
        hashedPassword: "hashedPassword",
        salt: "salt",
      });

      // Act
      await userRegister.register(validRegistrationParams);

      // Assert
      expect(mockUserRepository.matching).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            new Filter("email", Operator.EQUAL, validRegistrationParams.email),
          ],
        })
      );
    });
  });
});
