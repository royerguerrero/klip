import { Money, Currencies } from "../../../domain/value-object/Money";
import { InvalidMoneyError } from "../../../domain/errors/InvalidMoneyError";
import { DifferentCurrenciesError } from "../../../domain/errors/DifferentCurrenciesError";

describe("Money", () => {
  describe("constructor", () => {
    it("should create money with amount and currency", () => {
      const money = new Money(100.50, "USD");

      expect(money.amount).toBe(100.50);
      expect(money.currency).toBe("USD");
    });

    it("should accept different currencies", () => {
      const usd = new Money(100, "USD");
      const eur = new Money(85, "EUR");
      const cop = new Money(350000, "COP");

      expect(usd.currency).toBe("USD");
      expect(eur.currency).toBe("EUR");
      expect(cop.currency).toBe("COP");
    });

    it("should accept zero amount", () => {
      const money = new Money(0, "USD");

      expect(money.amount).toBe(0);
    });

    it("should throw InvalidMoneyError for negative amount", () => {
      expect(() => new Money(-50, "USD")).toThrow(InvalidMoneyError);
      expect(() => new Money(-0.01, "EUR")).toThrow(InvalidMoneyError);
    });
  });

  describe("equals", () => {
    it("should return true for money with same amount and currency", () => {
      const money1 = new Money(100.50, "USD");
      const money2 = new Money(100.50, "USD");

      expect(money1.equals(money2)).toBe(true);
    });

    it("should return false for money with different amounts", () => {
      const money1 = new Money(100, "USD");
      const money2 = new Money(200, "USD");

      expect(money1.equals(money2)).toBe(false);
    });

    it("should return false for money with different currencies", () => {
      const money1 = new Money(100, "USD");
      const money2 = new Money(100, "EUR");

      expect(money1.equals(money2)).toBe(false);
    });

    it("should return false for money with different amounts and currencies", () => {
      const money1 = new Money(100, "USD");
      const money2 = new Money(200, "EUR");

      expect(money1.equals(money2)).toBe(false);
    });

    it("should handle decimal precision correctly", () => {
      const money1 = new Money(100.123, "USD");
      const money2 = new Money(100.123, "USD");

      expect(money1.equals(money2)).toBe(true);
    });
  });

  describe("notEquals", () => {
    it("should return true for money with different amounts", () => {
      const money1 = new Money(100, "USD");
      const money2 = new Money(200, "USD");

      expect(money1.notEquals(money2)).toBe(true);
    });

    it("should return true for money with different currencies", () => {
      const money1 = new Money(100, "USD");
      const money2 = new Money(100, "EUR");

      expect(money1.notEquals(money2)).toBe(true);
    });

    it("should return false for money with same amount and currency", () => {
      const money1 = new Money(100.50, "USD");
      const money2 = new Money(100.50, "USD");

      expect(money1.notEquals(money2)).toBe(false);
    });
  });

  describe("properties", () => {
    it("should have readonly properties", () => {
      const money = new Money(100.50, "USD");

      expect(money.amount).toBe(100.50);
      expect(money.currency).toBe("USD");
    });
  });

  describe("Currencies type", () => {
    it("should accept valid currency types", () => {
      const currencies: Currencies[] = ["USD", "EUR", "COP"];

      currencies.forEach((currency) => {
        const money = new Money(100, currency);
        expect(money.currency).toBe(currency);
      });
    });
  });

  describe("money operations", () => {
    describe("addition", () => {
      it("should add two money amounts with same currency", () => {
        const money1 = new Money(100, "USD");
        const money2 = new Money(50, "USD");
        const result = money1.add(money2);

        expect(result.amount).toBe(150);
        expect(result.currency).toBe("USD");
      });

      it("should handle decimal addition", () => {
        const money1 = new Money(100.25, "USD");
        const money2 = new Money(50.75, "USD");
        const result = money1.add(money2);

        expect(result.amount).toBe(151);
        expect(result.currency).toBe("USD");
      });

      it("should throw DifferentCurrenciesError when adding different currencies", () => {
        const money1 = new Money(100, "USD");
        const money2 = new Money(50, "EUR");

        expect(() => money1.add(money2)).toThrow(DifferentCurrenciesError);
        expect(() => money1.add(money2)).toThrow("Cannot perform operation with different currencies: USD and EUR");
      });
    });

    describe("subtraction", () => {
      it("should subtract two money amounts with same currency", () => {
        const money1 = new Money(100, "USD");
        const money2 = new Money(30, "USD");
        const result = money1.subtract(money2);

        expect(result.amount).toBe(70);
        expect(result.currency).toBe("USD");
      });

      it("should handle zero result", () => {
        const money1 = new Money(100, "USD");
        const money2 = new Money(100, "USD");
        const result = money1.subtract(money2);

        expect(result.amount).toBe(0);
        expect(result.currency).toBe("USD");
      });

      it("should handle decimal subtraction", () => {
        const money1 = new Money(100.50, "USD");
        const money2 = new Money(25.25, "USD");
        const result = money1.subtract(money2);

        expect(result.amount).toBe(75.25);
        expect(result.currency).toBe("USD");
      });

      it("should throw DifferentCurrenciesError when subtracting different currencies", () => {
        const money1 = new Money(100, "USD");
        const money2 = new Money(50, "EUR");

        expect(() => money1.subtract(money2)).toThrow(DifferentCurrenciesError);
        expect(() => money1.subtract(money2)).toThrow("Cannot perform operation with different currencies: USD and EUR");
      });
    });

    describe("multiplication", () => {
      it("should multiply money by a number", () => {
        const money = new Money(100, "USD");
        const result = money.multiply(2.5);

        expect(result.amount).toBe(250);
        expect(result.currency).toBe("USD");
      });

      it("should handle decimal multiplication", () => {
        const money = new Money(100.50, "USD");
        const result = money.multiply(1.5);

        expect(result.amount).toBe(150.75);
        expect(result.currency).toBe("USD");
      });

      it("should handle zero multiplication", () => {
        const money = new Money(100, "USD");
        const result = money.multiply(0);

        expect(result.amount).toBe(0);
        expect(result.currency).toBe("USD");
      });
    });

    describe("division", () => {
      it("should divide money by a number", () => {
        const money = new Money(100, "USD");
        const result = money.divide(2);

        expect(result.amount).toBe(50);
        expect(result.currency).toBe("USD");
      });

      it("should handle decimal division", () => {
        const money = new Money(100, "USD");
        const result = money.divide(3);

        expect(result.amount).toBeCloseTo(33.33, 2);
        expect(result.currency).toBe("USD");
      });

      it("should throw error when dividing by zero", () => {
        const money = new Money(100, "USD");

        expect(() => money.divide(0)).toThrow("Cannot divide by zero");
      });
    });

    describe("comparison operations", () => {
      it("should compare money amounts", () => {
        const money1 = new Money(100, "USD");
        const money2 = new Money(50, "USD");
        const money3 = new Money(100, "USD");

        expect(money1.isGreaterThan(money2)).toBe(true);
        expect(money2.isLessThan(money1)).toBe(true);
        expect(money1.isGreaterThanOrEqual(money3)).toBe(true);
        expect(money1.isLessThanOrEqual(money3)).toBe(true);
      });

      it("should throw DifferentCurrenciesError when comparing different currencies", () => {
        const money1 = new Money(100, "USD");
        const money2 = new Money(50, "EUR");

        expect(() => money1.isGreaterThan(money2)).toThrow(DifferentCurrenciesError);
        expect(() => money1.isLessThan(money2)).toThrow(DifferentCurrenciesError);
        expect(() => money1.isGreaterThanOrEqual(money2)).toThrow(DifferentCurrenciesError);
        expect(() => money1.isLessThanOrEqual(money2)).toThrow(DifferentCurrenciesError);
      });
    });

    describe("formatting", () => {
      it("should format money as string", () => {
        const money = new Money(1234.56, "USD");
        const formatted = money.toString();

        expect(formatted).toMatch(/\$1,234\.56/);
      });

      it("should format different currencies", () => {
        const usd = new Money(1234.56, "USD");
        const eur = new Money(1234.56, "EUR");
        const cop = new Money(1234567, "COP");

        expect(usd.toString()).toMatch(/\$1,234\.56/);
        expect(eur.toString()).toMatch(/€1,234\.56/);
        expect(cop.toString()).toMatch(/COP.*1,234,567\.00/);
      });
    });
  });
}); 