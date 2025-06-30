import { PhoneNumber } from "../../../domain/value-object/PhoneNumber";
import { PhoneNumberIsNotValid } from "../../../domain/errors/PhoneNumberIsNotValid";

describe("PhoneNumber", () => {
  describe("constructor", () => {
    it("should create phone number with valid E.164 format", () => {
      const phoneNumber = new PhoneNumber("+1 5551234567");

      expect(phoneNumber.value).toBe("+1 5551234567");
    });

    it("should throw PhoneNumberIsNotValid for invalid phone numbers", () => {
      const invalidNumbers = [
        "1234567890", // missing country code
        "+1", // missing number
        "+1 123", // too short
        "+999 123456789012345", // too long
        "1 5551234567", // missing +
        "+1-555-123-4567", // wrong format
        "+1  5551234567", // double space
        "", // empty
      ];

      invalidNumbers.forEach((number) => {
        expect(() => new PhoneNumber(number)).toThrow(PhoneNumberIsNotValid);
      });
    });

    it("should accept valid E.164 format phone numbers", () => {
      const validNumbers = [
        "+1 5551234567",
        "+44 7911123456",
        "+33 612345678",
        "+86 13812345678",
        "+81 9012345678",
        "+49 15112345678",
        "+57 3178901234",
      ];

      validNumbers.forEach((number) => {
        expect(() => new PhoneNumber(number)).not.toThrow();
      });
    });
  });

  describe("prefix getter", () => {
    it("should return the country code", () => {
      const phoneNumber = new PhoneNumber("+1 5551234567");

      expect(phoneNumber.prefix).toBe("+1");
    });

    it("should return different prefixes for different countries", () => {
      const usNumber = new PhoneNumber("+1 5551234567");
      const ukNumber = new PhoneNumber("+44 7911123456");

      expect(usNumber.prefix).toBe("+1");
      expect(ukNumber.prefix).toBe("+44");
    });
  });

  describe("number getter", () => {
    it("should return the phone number without country code", () => {
      const phoneNumber = new PhoneNumber("+1 5551234567");

      expect(phoneNumber.number).toBe("5551234567");
    });

    it("should return different numbers for different phone numbers", () => {
      const phone1 = new PhoneNumber("+1 5551234567");
      const phone2 = new PhoneNumber("+1 5559876543");

      expect(phone1.number).toBe("5551234567");
      expect(phone2.number).toBe("5559876543");
    });
  });

  describe("equals", () => {
    it("should return true for phone numbers with same value", () => {
      const phone1 = new PhoneNumber("+1 5551234567");
      const phone2 = new PhoneNumber("+1 5551234567");

      expect(phone1.equals(phone2)).toBe(true);
    });

    it("should return false for phone numbers with different values", () => {
      const phone1 = new PhoneNumber("+1 5551234567");
      const phone2 = new PhoneNumber("+1 5559876543");

      expect(phone1.equals(phone2)).toBe(false);
    });

    it("should be case sensitive", () => {
      const phone1 = new PhoneNumber("+1 5551234567");
      const phone2 = new PhoneNumber("+1 5551234567");

      expect(phone1.equals(phone2)).toBe(true);
    });
  });

  describe("notEquals", () => {
    it("should return true for phone numbers with different values", () => {
      const phone1 = new PhoneNumber("+1 5551234567");
      const phone2 = new PhoneNumber("+1 5559876543");

      expect(phone1.notEquals(phone2)).toBe(true);
    });

    it("should return false for phone numbers with same value", () => {
      const phone1 = new PhoneNumber("+1 5551234567");
      const phone2 = new PhoneNumber("+1 5551234567");

      expect(phone1.notEquals(phone2)).toBe(false);
    });
  });

  describe("value property", () => {
    it("should be readonly", () => {
      const phoneNumber = new PhoneNumber("+1 5551234567");

      expect(phoneNumber.value).toBe("+1 5551234567");
    });
  });
});
