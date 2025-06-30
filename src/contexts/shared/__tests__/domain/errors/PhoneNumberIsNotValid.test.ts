import { PhoneNumberIsNotValid } from "../../../domain/errors/PhoneNumberIsNotValid";

describe("PhoneNumberIsNotValid", () => {
  it("should create error with phone number", () => {
    const phoneNumber = "+1 123456789";
    const error = new PhoneNumberIsNotValid(phoneNumber);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(`The phone number <${phoneNumber}> is not valid`);
    expect(error.name).toBe("PhoneNumberIsNotValid");
  });

  it("should be throwable", () => {
    expect(() => {
      throw new PhoneNumberIsNotValid("+1 123456789");
    }).toThrow(PhoneNumberIsNotValid);
  });

  it("should preserve stack trace", () => {
    const error = new PhoneNumberIsNotValid("+1 123456789");

    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");
  });

  it("should handle empty phone number", () => {
    const error = new PhoneNumberIsNotValid("");

    expect(error.message).toBe("The phone number <> is not valid");
  });

  it("should handle special characters in phone number", () => {
    const phoneNumber = "+1 (555) 123-4567";
    const error = new PhoneNumberIsNotValid(phoneNumber);

    expect(error.message).toBe(`The phone number <${phoneNumber}> is not valid`);
  });
}); 