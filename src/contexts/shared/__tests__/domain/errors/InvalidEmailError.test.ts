import { InvalidEmailError } from "../../../domain/errors/InvalidEmailError";

describe("InvalidEmailError", () => {
  it("should create error with message", () => {
    const message = "Invalid email format";
    const error = new InvalidEmailError(message);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.name).toBe("InvalidEmailError");
  });

  it("should create error with default message", () => {
    const error = new InvalidEmailError();

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Invalid email");
    expect(error.name).toBe("InvalidEmailError");
  });

  it("should be throwable", () => {
    expect(() => {
      throw new InvalidEmailError("Test error");
    }).toThrow(InvalidEmailError);
  });

  it("should preserve stack trace", () => {
    const error = new InvalidEmailError("Test error");

    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");
  });
}); 