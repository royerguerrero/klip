import { DifferentCurrenciesError } from "../../../domain/errors/DifferentCurrenciesError";

describe("DifferentCurrenciesError", () => {
  it("should create error with currency information", () => {
    const error = new DifferentCurrenciesError("USD", "EUR");

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Cannot perform operation with different currencies: USD and EUR");
    expect(error.name).toBe("DifferentCurrenciesError");
  });

  it("should handle different currency combinations", () => {
    const error1 = new DifferentCurrenciesError("USD", "COP");
    const error2 = new DifferentCurrenciesError("EUR", "USD");

    expect(error1.message).toBe("Cannot perform operation with different currencies: USD and COP");
    expect(error2.message).toBe("Cannot perform operation with different currencies: EUR and USD");
  });

  it("should be throwable", () => {
    expect(() => {
      throw new DifferentCurrenciesError("USD", "EUR");
    }).toThrow(DifferentCurrenciesError);
  });

  it("should preserve stack trace", () => {
    const error = new DifferentCurrenciesError("USD", "EUR");

    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");
  });
}); 