import { ValueObject } from "../../domain/ValueObject";

// Concrete implementation for testing
class TestValueObject extends ValueObject {
  constructor(public readonly value: string) {
    super();
  }

  equals(other: ValueObject): boolean {
    if (!(other instanceof TestValueObject)) {
      return false;
    }
    return this.value === other.value;
  }

  notEquals(other: ValueObject): boolean {
    return !this.equals(other);
  }
}

describe("ValueObject", () => {
  describe("equals", () => {
    it("should return true when values are equal", () => {
      const vo1 = new TestValueObject("test");
      const vo2 = new TestValueObject("test");

      expect(vo1.equals(vo2)).toBe(true);
    });

    it("should return false when values are different", () => {
      const vo1 = new TestValueObject("test1");
      const vo2 = new TestValueObject("test2");

      expect(vo1.equals(vo2)).toBe(false);
    });

    it("should return false when comparing with different type", () => {
      const vo1 = new TestValueObject("test");
      const differentVo = new (class extends ValueObject {
        equals(): boolean {
          return false;
        }
        notEquals(): boolean {
          return true;
        }
      })();

      expect(vo1.equals(differentVo)).toBe(false);
    });
  });

  describe("notEquals", () => {
    it("should return true when values are different", () => {
      const vo1 = new TestValueObject("test1");
      const vo2 = new TestValueObject("test2");

      expect(vo1.notEquals(vo2)).toBe(true);
    });

    it("should return false when values are equal", () => {
      const vo1 = new TestValueObject("test");
      const vo2 = new TestValueObject("test");

      expect(vo1.notEquals(vo2)).toBe(false);
    });
  });
});
