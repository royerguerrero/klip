import { Country } from "./Country";
import { ValueObject } from "./ValueObject";

export class Address implements ValueObject {
  constructor(
    readonly country: Country,
    readonly addressLines: ReadonlyArray<string[]>,
    readonly locality: string,
    readonly administrativeArea: string,
    readonly postalCode: string
  ) {}

  toString(): string {
    return `${this.addressLines.flat().join(", ")}, ${this.locality}, ${
      this.administrativeArea
    }, ${this.postalCode}, ${this.country}`;
  }
}
