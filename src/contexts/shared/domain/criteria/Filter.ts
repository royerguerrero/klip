import { Operator } from "./Operator";

export class Filter {
  constructor(
    readonly field: string,
    readonly operator: Operator,
    readonly value: string
  ) {}
}
