import { Password } from "../../../domain/value-object/Password";
import { InvalidPasswordError } from "../../../domain/errors/InvalidPasswordError";

describe("Password", () => {
  describe("constructor", () => {
    it("should create password with valid password", () => {
      const password = new Password("validpassword123");

      expect(password.value).toBe("validpassword123");
    });

    it("should throw InvalidPasswordError for password shorter than 8 characters", () => {
      expect(() => new Password("short")).toThrow(InvalidPasswordError);
      expect(() => new Password("1234567")).toThrow(InvalidPasswordError);
      expect(() => new Password("")).toThrow(InvalidPasswordError);
    });

    it("should accept passwords with 8 or more characters", () => {
      const validPasswords = [
        "password123",
        "12345678",
        "verylongpasswordwithspecialchars!@#",
        "eightcha",
      ];

      validPasswords.forEach((passwordStr) => {
        expect(() => new Password(passwordStr)).not.toThrow();
      });
    });

    it("should throw InvalidPasswordError for invalid passwords", () => {
      const invalidPasswords = [
        "",
        "short",
        "1234567",
        "abc",
      ];

      invalidPasswords.forEach((passwordStr) => {
        expect(() => new Password(passwordStr)).toThrow(InvalidPasswordError);
      });
    });
  });

  describe("equals", () => {
    it("should return true for passwords with same value", () => {
      const password1 = new Password("testpassword123");
      const password2 = new Password("testpassword123");

      expect(password1.equals(password2)).toBe(true);
    });

    it("should return false for passwords with different values", () => {
      const password1 = new Password("password123");
      const password2 = new Password("differentpassword123");

      expect(password1.equals(password2)).toBe(false);
    });

    it("should be case sensitive", () => {
      const password1 = new Password("Password123");
      const password2 = new Password("password123");

      expect(password1.equals(password2)).toBe(false);
    });
  });

  describe("notEquals", () => {
    it("should return true for passwords with different values", () => {
      const password1 = new Password("password123");
      const password2 = new Password("differentpassword123");

      expect(password1.notEquals(password2)).toBe(true);
    });

    it("should return false for passwords with same value", () => {
      const password1 = new Password("testpassword123");
      const password2 = new Password("testpassword123");

      expect(password1.notEquals(password2)).toBe(false);
    });
  });

  describe("value property", () => {
    it("should be readonly", () => {
      const password = new Password("testpassword123");

      expect(password.value).toBe("testpassword123");
      // TypeScript should prevent assignment at compile time
      // The readonly modifier is a compile-time check, not runtime
      expect(() => {
        // @ts-expect-error - Testing readonly behavior
        password.value = "newpassword123";
      }).not.toThrow();
    });
  });
}); 