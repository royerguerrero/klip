import { InvalidMoneyError } from "../../../domain/errors/InvalidMoneyError";

describe("InvalidMoneyError", () => {
  it("should create error with message", () => {
    const message = "Money amount cannot be negative";
    const error = new InvalidMoneyError(message);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.name).toBe("InvalidMoneyError");
  });

  it("should be throwable", () => {
    expect(() => {
      throw new InvalidMoneyError("Test error");
    }).toThrow(InvalidMoneyError);
  });

  it("should preserve stack trace", () => {
    const error = new InvalidMoneyError("Test error");

    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");
  });
}); 