import { ValueObject } from "./ValueObject";

type Currency = {
  iso: string;
  symbol: string;
};

export class Money extends ValueObject {
  constructor(readonly amount: number, readonly currency: Currency) {
    super();
  }
}
