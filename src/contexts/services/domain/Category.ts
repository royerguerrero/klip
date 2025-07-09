import { ValueObject } from "@/contexts/shared/domain/ValueObject";

export class Category implements ValueObject {
  constructor(
    public readonly category: string,
    public readonly subcategory: string
  ) {}

  equals(other: ValueObject): boolean {
    if (!(other instanceof Category)) return false;
    return (
      this.category === other.category &&
      this.subcategory === other.subcategory
    );
  }

  notEquals(other: ValueObject): boolean {
    return !this.equals(other);
  }
}
