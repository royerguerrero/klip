import { AggregateRoot } from "../../domain/AggregateRoot";

// Concrete implementation for testing
class TestAggregateRoot extends AggregateRoot {
  constructor(public readonly id: string, public readonly name: string) {
    super();
    this.id = id;
  }

  toPrimitives(): { id: string; name: string } {
    return {
      id: this.id,
      name: this.name,
    };
  }

  static fromPrimitives(props: ReturnType<TestAggregateRoot["toPrimitives"]>): TestAggregateRoot {
    return new TestAggregateRoot(props.id, props.name);
  }
}

describe("AggregateRoot", () => {
  it("should extend Entity", () => {
    const aggregate = new TestAggregateRoot("123", "Test Aggregate");

    expect(aggregate).toBeInstanceOf(AggregateRoot);
    expect(aggregate).toHaveProperty("toPrimitives");
    expect(typeof aggregate.toPrimitives).toBe("function");
  });

  it("should be able to convert to primitives", () => {
    const aggregate = new TestAggregateRoot("123", "Test Aggregate");

    const primitives = aggregate.toPrimitives();

    expect(primitives).toEqual({
      id: "123",
      name: "Test Aggregate",
    });
  });

  it("should have an id property", () => {
    const aggregate = new TestAggregateRoot("123", "Test Aggregate");

    expect(aggregate.id).toBe("123");
  });

  describe("fromPrimitives", () => {
    it("should create an aggregate root from primitives", () => {
      const obj = { id: "789", name: "From Primitives Aggregate" };
      const aggregate = TestAggregateRoot.fromPrimitives(obj);

      expect(aggregate).toBeInstanceOf(TestAggregateRoot);
      expect(aggregate).toBeInstanceOf(AggregateRoot);
      expect(aggregate.id).toBe("789");
      expect(aggregate.name).toBe("From Primitives Aggregate");
    });

    it("should create different aggregate roots for different primitives", () => {
      const obj1 = { id: "1", name: "Aggregate A" };
      const obj2 = { id: "2", name: "Aggregate B" };
      const aggregate1 = TestAggregateRoot.fromPrimitives(obj1);
      const aggregate2 = TestAggregateRoot.fromPrimitives(obj2);

      expect(aggregate1.id).not.toBe(aggregate2.id);
      expect(aggregate1.name).not.toBe(aggregate2.name);
    });

    it("should maintain inheritance chain when created from primitives", () => {
      const obj = { id: "123", name: "Test" };
      const aggregate = TestAggregateRoot.fromPrimitives(obj);

      expect(aggregate).toBeInstanceOf(TestAggregateRoot);
      expect(aggregate).toBeInstanceOf(AggregateRoot);
      expect(typeof aggregate.toPrimitives).toBe("function");
    });
  });
}); 