import { PasswordHasher } from "../../domain/PasswordHasher";
import { Password } from "../../domain/value-object/Password";

// Concrete implementation for testing
class TestPasswordHasher extends PasswordHasher {
  async hash(
    password: Password,
    salt: string
  ): Promise<{ hashedPassword: string; salt: string }> {
    return {
      hashedPassword: `hashed_${password.value}_${salt}`,
      salt,
    };
  }

  async compare(
    password: Password,
    hashedPassword: string,
    salt: string
  ): Promise<boolean> {
    const { hashedPassword: expectedHash } = await this.hash(password, salt);
    return hashedPassword === expectedHash;
  }

  generateSalt(): string {
    return "test-salt";
  }
}

describe("PasswordHasher", () => {
  let passwordHasher: TestPasswordHasher;
  let password: Password;

  beforeEach(() => {
    passwordHasher = new TestPasswordHasher();
    password = new Password("testpassword123");
  });

  describe("hash", () => {
    it("should hash password with salt", async () => {
      const salt = "test-salt";
      const result = await passwordHasher.hash(password, salt);

      expect(result).toEqual({
        hashedPassword: "hashed_testpassword123_test-salt",
        salt: "test-salt",
      });
    });

    it("should return different hashes for different salts", async () => {
      const salt1 = "salt1";
      const salt2 = "salt2";

      const result1 = await passwordHasher.hash(password, salt1);
      const result2 = await passwordHasher.hash(password, salt2);

      expect(result1.hashedPassword).not.toBe(result2.hashedPassword);
      expect(result1.salt).toBe(salt1);
      expect(result2.salt).toBe(salt2);
    });
  });

  describe("compare", () => {
    it("should return true for matching password and hash", async () => {
      const salt = "test-salt";
      const { hashedPassword } = await passwordHasher.hash(password, salt);

      const result = await passwordHasher.compare(password, hashedPassword, salt);

      expect(result).toBe(true);
    });

    it("should return false for non-matching password and hash", async () => {
      const salt = "test-salt";
      const wrongPassword = new Password("wrongpassword123");

      const result = await passwordHasher.compare(wrongPassword, "wrong-hash", salt);

      expect(result).toBe(false);
    });
  });

  describe("generateSalt", () => {
    it("should generate a salt string", () => {
      const salt = passwordHasher.generateSalt();

      expect(typeof salt).toBe("string");
      expect(salt).toBe("test-salt");
    });
  });
}); 