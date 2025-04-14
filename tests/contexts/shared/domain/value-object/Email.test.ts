import { EmailIsNotValid } from "@/contexts/shared/domain/errors/EmailIsNotValid";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { describe, expect, it } from "@jest/globals";

describe("Email", () => {
  it("should create a valid email", () => {
    const validEmail = "test@example.com";
    const email = new Email(validEmail);
    expect(email.value).toBe(validEmail);
  });

  it("should throw an error for an invalid email", () => {
    const invalidEmail = "invalid-email";
    expect(() => new Email(invalidEmail)).toThrowError(
      new EmailIsNotValid(invalidEmail),
    );
  });

  it("should throw an error for an email without domain", () => {
    const invalidEmail = "test@";
    expect(() => new Email(invalidEmail)).toThrowError(
      new EmailIsNotValid(invalidEmail),
    );
  });

  it("should throw an error for an email without username", () => {
    const invalidEmail = "@example.com";
    expect(() => new Email(invalidEmail)).toThrowError(
      new EmailIsNotValid(invalidEmail),
    );
  });

  it("should throw an error for an email with spaces", () => {
    const invalidEmail = "test @example.com";
    expect(() => new Email(invalidEmail)).toThrowError(
      new EmailIsNotValid(invalidEmail),
    );
  });
});
