import { ValueObject } from "@/contexts/shared/domain/ValueObject";
import { InvalidMoneyError } from "@/contexts/shared/domain/errors/InvalidMoneyError";
import { DifferentCurrenciesError } from "@/contexts/shared/domain/errors/DifferentCurrenciesError";

export type Currencies = "USD" | "EUR" | "COP";

export class Money extends ValueObject {
  constructor(
    public readonly amount: number,
    public readonly currency: Currencies
  ) {
    super();
    this.ensureIsValidMoney();
  }

  private ensureIsValidMoney(): void {
    if (this.amount < 0) {
      throw new InvalidMoneyError("Money amount cannot be negative");
    }
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  notEquals(other: Money): boolean {
    return !this.equals(other);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new DifferentCurrenciesError(this.currency, other.currency);
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new DifferentCurrenciesError(this.currency, other.currency);
    }
    return new Money(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  divide(divisor: number): Money {
    if (divisor === 0) {
      throw new Error("Cannot divide by zero");
    }
    return new Money(this.amount / divisor, this.currency);
  }

  isGreaterThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new DifferentCurrenciesError(this.currency, other.currency);
    }
    return this.amount > other.amount;
  }

  isLessThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new DifferentCurrenciesError(this.currency, other.currency);
    }
    return this.amount < other.amount;
  }

  isGreaterThanOrEqual(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new DifferentCurrenciesError(this.currency, other.currency);
    }
    return this.amount >= other.amount;
  }

  isLessThanOrEqual(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new DifferentCurrenciesError(this.currency, other.currency);
    }
    return this.amount <= other.amount;
  }

  toString(): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency,
    });
    return formatter.format(this.amount);
  }
}
