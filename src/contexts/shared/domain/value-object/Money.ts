import { MoneyIsNotValid } from "../errors/MoneyIsNotValid";
import { ValueObject } from "./ValueObject";

export class Money implements ValueObject {
  constructor(
    readonly amount: number,
    readonly currency: "COP" | "USD",
  ) {
    this.ensureIsValidMoney();
  }

  ensureIsValidMoney() {
    if (this.amount <= 0) {
      throw new MoneyIsNotValid(this.amount, this.currency);
    }

    if (this.currency) {
      throw new MoneyIsNotValid(this.amount, this.currency);
    }
  }

  toString() {
    return `${this.amount} ${this.currency}`;
  }
}
