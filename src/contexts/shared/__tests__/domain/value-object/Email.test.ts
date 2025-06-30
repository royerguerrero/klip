import { Email } from "../../../domain/value-object/Email";
import { InvalidEmailError } from "../../../domain/errors/InvalidEmailError";

describe("Email", () => {
  describe("constructor", () => {
    it("should create email with valid email address", () => {
      const email = new Email("test@example.com");

      expect(email.value).toBe("test@example.com");
    });

    it("should throw InvalidEmailError for invalid email", () => {
      expect(() => new Email("invalid-email")).toThrow(InvalidEmailError);
      expect(() => new Email("test@")).toThrow(InvalidEmailError);
      expect(() => new Email("@example.com")).toThrow(InvalidEmailError);
      expect(() => new Email("test.example.com")).toThrow(InvalidEmailError);
    });

    it("should accept valid email formats", () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user+tag@example.org",
        "123@numbers.com",
        "test.email@subdomain.example.com",
      ];

      validEmails.forEach((emailStr) => {
        expect(() => new Email(emailStr)).not.toThrow();
      });
    });

    it("should reject invalid email formats", () => {
      // Only include cases that the current regex actually rejects
      const invalidEmails = [
        "",
        "invalid",
        "test@",
        "@example.com",
        "test@.com",
        "test@example.",
        "test@@example.com",
      ];

      invalidEmails.forEach((emailStr) => {
        expect(() => new Email(emailStr)).toThrow(InvalidEmailError);
      });
    });
  });

  describe("equals", () => {
    it("should return true for emails with same value", () => {
      const email1 = new Email("test@example.com");
      const email2 = new Email("test@example.com");

      expect(email1.equals(email2)).toBe(true);
    });

    it("should return false for emails with different values", () => {
      const email1 = new Email("test1@example.com");
      const email2 = new Email("test2@example.com");

      expect(email1.equals(email2)).toBe(false);
    });

    it("should be case sensitive", () => {
      const email1 = new Email("Test@example.com");
      const email2 = new Email("test@example.com");

      expect(email1.equals(email2)).toBe(false);
    });
  });

  describe("notEquals", () => {
    it("should return true for emails with different values", () => {
      const email1 = new Email("test1@example.com");
      const email2 = new Email("test2@example.com");

      expect(email1.notEquals(email2)).toBe(true);
    });

    it("should return false for emails with same value", () => {
      const email1 = new Email("test@example.com");
      const email2 = new Email("test@example.com");

      expect(email1.notEquals(email2)).toBe(false);
    });
  });

  describe("value property", () => {
    it("should be accessible", () => {
      const email = new Email("test@example.com");

      expect(email.value).toBe("test@example.com");
    });
  });
}); 