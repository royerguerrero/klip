import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { describe, it, expect } from "@jest/globals";

describe("PhoneNumber", () => {
  it("should create a valid phone number", () => {
    const phoneNumber = new PhoneNumber("+1234567890");
    expect(phoneNumber.value).toBe("+1234567890");
  });

  it("should throw an error for an invalid phone number", () => {
    expect(() => new PhoneNumber("12345")).toThrowError(
      "Invalid phone number: 12345"
    );
  });

  it("should throw an error for an empty phone number", () => {
    expect(() => new PhoneNumber("")).toThrowError("Invalid phone number: ");
  });

  it("should throw an error for a phone number with invalid characters", () => {
    expect(() => new PhoneNumber("+123-456-7890")).toThrowError(
      "Invalid phone number: +123-456-7890"
    );
  });

  it("should create a valid phone number without a plus sign", () => {
    const phoneNumber = new PhoneNumber("1234567890");
    expect(phoneNumber.value).toBe("1234567890");
  });
});
