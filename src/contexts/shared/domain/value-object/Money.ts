import { ValueObject } from "./ValueObject";

type Currency = {
  iso: string;
  symbol: string;
};

export class Money implements ValueObject {
  constructor(readonly amount: number, readonly currency: Currency) {}
}
