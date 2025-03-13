import { PhoneNumber } from "@/contexts/shared/domain/value-object/PhoneNumber";
import { describe, it, expect } from "@jest/globals";

describe("PhoneNumber", () => {
  it("should create a valid phone number", () => {
    const validPhoneNumbers = [{ prefix: "+1", number: "234567890" }];

    validPhoneNumbers.forEach((item) => {
      const phoneNumber = new PhoneNumber(`${item.prefix} ${item.number}`);
      expect(phoneNumber.value).toBe(`${item.prefix} ${item.number}`);
      expect(phoneNumber.prefix).toBe(item.prefix);
      expect(phoneNumber.number).toBe(item.number);
    });
  });

  it("should throw an error for an invalid phone number", () => {
    const invalidPhoneNumbers = [
      "",
      "12345",
      "+123-456-7890",
      "+1 23-456-7890",
      "123 456 532",
      "+1 23456789123456789",
      "+1234 234567890",
      "+09888 87392179",
      "+1234567890",
    ];

    invalidPhoneNumbers.forEach((phoneNumber) => {
      expect(() => new PhoneNumber(phoneNumber)).toThrowError(
        `Invalid phone number: ${phoneNumber}`,
      );
    });
  });
});
