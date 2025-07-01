import { CryptoPasswordHasher } from "@/contexts/shared/infrastructure/CryptoPasswordHasher";
import { Password } from "@/contexts/shared/domain/value-object/Password";

describe("CryptoPasswordHasher Integration", () => {
  let passwordHasher: CryptoPasswordHasher;

  beforeEach(() => {
    passwordHasher = new CryptoPasswordHasher();
  });

  describe("hash", () => {
    it("should hash password with salt using crypto.scrypt", async () => {
      const password = new Password("testpassword123");
      const salt = "test-salt-123";

      const result = await passwordHasher.hash(password, salt);

      expect(result).toHaveProperty("hashedPassword");
      expect(result).toHaveProperty("salt");
      expect(result.salt).toBe(salt);
      expect(typeof result.hashedPassword).toBe("string");
      expect(result.hashedPassword.length).toBeGreaterThan(0);
    });

    it("should generate different hashes for same password with different salts", async () => {
      const password = new Password("testpassword123");
      const salt1 = "salt1";
      const salt2 = "salt2";

      const result1 = await passwordHasher.hash(password, salt1);
      const result2 = await passwordHasher.hash(password, salt2);

      expect(result1.hashedPassword).not.toBe(result2.hashedPassword);
      expect(result1.salt).toBe(salt1);
      expect(result2.salt).toBe(salt2);
    });

    it("should generate same hash for same password and salt", async () => {
      const password = new Password("testpassword123");
      const salt = "consistent-salt";

      const result1 = await passwordHasher.hash(password, salt);
      const result2 = await passwordHasher.hash(password, salt);

      expect(result1.hashedPassword).toBe(result2.hashedPassword);
      expect(result1.salt).toBe(result2.salt);
    });

    it("should handle different password lengths", async () => {
      const shortPassword = new Password("short123");
      const longPassword = new Password(
        "verylongpasswordwithspecialchars!@#$%^&*()"
      );
      const salt = "test-salt";

      const shortResult = await passwordHasher.hash(shortPassword, salt);
      const longResult = await passwordHasher.hash(longPassword, salt);

      expect(shortResult.hashedPassword).not.toBe(longResult.hashedPassword);
      expect(shortResult.hashedPassword.length).toBeGreaterThan(0);
      expect(longResult.hashedPassword.length).toBeGreaterThan(0);
    });
  });

  describe("compare", () => {
    it("should return true for matching password and hash", async () => {
      const password = new Password("testpassword123");
      const salt = "test-salt";
      const { hashedPassword } = await passwordHasher.hash(password, salt);

      const result = await passwordHasher.compare(
        password,
        hashedPassword,
        salt
      );

      expect(result).toBe(true);
    });

    it("should return false for non-matching password", async () => {
      const originalPassword = new Password("testpassword123");
      const wrongPassword = new Password("wrongpassword123");
      const salt = "test-salt";
      const { hashedPassword } = await passwordHasher.hash(
        originalPassword,
        salt
      );

      const result = await passwordHasher.compare(
        wrongPassword,
        hashedPassword,
        salt
      );

      expect(result).toBe(false);
    });

    it("should return false for wrong salt", async () => {
      const password = new Password("testpassword123");
      const correctSalt = "correct-salt";
      const wrongSalt = "wrong-salt";
      const { hashedPassword } = await passwordHasher.hash(
        password,
        correctSalt
      );

      const result = await passwordHasher.compare(
        password,
        hashedPassword,
        wrongSalt
      );

      expect(result).toBe(false);
    });

    it("should return false for wrong hash", async () => {
      const password = new Password("testpassword123");
      const salt = "test-salt";
      const wrongHash = "wrong-hash-value";

      const result = await passwordHasher.compare(password, wrongHash, salt);

      expect(result).toBe(false);
    });

    it("should use timing-safe comparison", async () => {
      const password = new Password("testpassword123");
      const salt = "test-salt";
      const { hashedPassword } = await passwordHasher.hash(password, salt);

      const startTime = Date.now();
      await passwordHasher.compare(password, hashedPassword, salt);
      const correctTime = Date.now() - startTime;

      const startTime2 = Date.now();
      await passwordHasher.compare(password, "wrong-hash", salt);
      const wrongTime = Date.now() - startTime2;

      // Timing should be similar (within 100ms) due to timing-safe comparison
      expect(Math.abs(correctTime - wrongTime)).toBeLessThan(100);
    });
  });

  describe("generateSalt", () => {
    it("should generate a random salt", () => {
      const salt1 = passwordHasher.generateSalt();
      const salt2 = passwordHasher.generateSalt();

      expect(typeof salt1).toBe("string");
      expect(salt1.length).toBeGreaterThan(0);
      expect(salt1).not.toBe(salt2);
    });

    it("should generate hex-encoded salt", () => {
      const salt = passwordHasher.generateSalt();

      expect(salt).toMatch(/^[0-9a-f]+$/);
    });

    it("should generate consistent length salts", () => {
      const salts = Array.from({ length: 10 }, () =>
        passwordHasher.generateSalt()
      );

      const lengths = salts.map((salt) => salt.length);
      const uniqueLengths = new Set(lengths);

      expect(uniqueLengths.size).toBe(1); // All salts should have the same length
      expect(lengths[0]).toBe(32); // 16 bytes = 32 hex characters
    });
  });

  describe("end-to-end workflow", () => {
    it("should complete full password hashing and verification workflow", async () => {
      const password = new Password("securepassword123");

      // Generate salt
      const salt = passwordHasher.generateSalt();
      expect(typeof salt).toBe("string");
      expect(salt.length).toBe(32);

      // Hash password
      const { hashedPassword } = await passwordHasher.hash(password, salt);
      expect(typeof hashedPassword).toBe("string");
      expect(hashedPassword.length).toBeGreaterThan(0);

      // Verify password
      const isValid = await passwordHasher.compare(
        password,
        hashedPassword,
        salt
      );
      expect(isValid).toBe(true);

      // Verify wrong password fails
      const wrongPassword = new Password("wrongpassword123");
      const isInvalid = await passwordHasher.compare(
        wrongPassword,
        hashedPassword,
        salt
      );
      expect(isInvalid).toBe(false);
    });
  });
});
