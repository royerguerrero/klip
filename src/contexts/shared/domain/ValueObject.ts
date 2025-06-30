export abstract class ValueObject {
  abstract equals(other: ValueObject): boolean;
  abstract notEquals(other: ValueObject): boolean;
}
