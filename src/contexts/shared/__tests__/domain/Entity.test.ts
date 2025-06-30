import { Entity } from "../../domain/Entity";

// Concrete implementation for testing
class TestEntity extends Entity {
  constructor(public readonly id: string, public readonly name: string) {
    super();
    this.id = id;
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  static fromPrimitives(
    props: ReturnType<TestEntity["toPrimitives"]>
  ): TestEntity {
    return new TestEntity(props.id, props.name);
  }
}

describe("Entity", () => {
  describe("toPrimitives", () => {
    it("should return object representation of the entity", () => {
      const entity = new TestEntity("123", "Test Entity");

      const primitives = entity.toPrimitives();

      expect(primitives).toEqual({
        id: "123",
        name: "Test Entity",
      });
    });

    it("should return different objects for different entities", () => {
      const entity1 = new TestEntity("123", "Entity 1");
      const entity2 = new TestEntity("456", "Entity 2");

      const primitives1 = entity1.toPrimitives();
      const primitives2 = entity2.toPrimitives();

      expect(primitives1).not.toEqual(primitives2);
    });
  });

  describe("fromPrimitives", () => {
    it("should create an entity from primitives", () => {
      const obj = { id: "789", name: "From Primitives" };
      const entity = TestEntity.fromPrimitives(obj);

      expect(entity).toBeInstanceOf(TestEntity);
      expect(entity.id).toBe("789");
      expect(entity.name).toBe("From Primitives");
    });

    it("should create different entities for different primitives", () => {
      const obj1 = { id: "1", name: "A" };
      const obj2 = { id: "2", name: "B" };
      const entity1 = TestEntity.fromPrimitives(obj1);
      const entity2 = TestEntity.fromPrimitives(obj2);

      expect(entity1.id).not.toBe(entity2.id);
      expect(entity1.name).not.toBe(entity2.name);
    });
  });

  describe("id property", () => {
    it("should have an id property", () => {
      const entity = new TestEntity("123", "Test Entity");

      expect(entity.id).toBe("123");
    });
  });
});
