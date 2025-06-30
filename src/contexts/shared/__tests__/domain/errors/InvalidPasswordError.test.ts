import { InvalidPasswordError } from "../../../domain/errors/InvalidPasswordError";

describe("InvalidPasswordError", () => {
  it("should create error with message", () => {
    const message = "Password must be at least 8 characters";
    const error = new InvalidPasswordError(message);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.name).toBe("InvalidPasswordError");
  });

  it("should create error with default message", () => {
    const error = new InvalidPasswordError();

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Invalid password");
    expect(error.name).toBe("InvalidPasswordError");
  });

  it("should be throwable", () => {
    expect(() => {
      throw new InvalidPasswordError("Test error");
    }).toThrow(InvalidPasswordError);
  });

  it("should preserve stack trace", () => {
    const error = new InvalidPasswordError("Test error");

    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");
  });
}); 