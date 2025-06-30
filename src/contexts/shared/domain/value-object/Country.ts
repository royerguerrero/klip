import { ValueObject } from "../ValueObject";

export class Country extends ValueObject {
  constructor(
    public readonly value: string,
    public readonly name: string,
    public readonly prefix: string,
    public readonly currency: string,
    public readonly documentTypes: string[]
  ) {
    super();
  }

  equals(other: Country): boolean {
    return this.value === other.value;
  }

  notEquals(other: Country): boolean {
    return !this.equals(other);
  }
}
