import { Criteria } from "../../../domain/criteria/Criteria";
import { Filter } from "../../../domain/criteria/Filter";
import { Order, OrderOption } from "../../../domain/criteria/Order";
import { Operator } from "../../../domain/criteria/Operator";

describe("Criteria", () => {
  describe("constructor", () => {
    it("should create criteria with all properties", () => {
      const filters = [
        new Filter("name", Operator.EQUAL, "John"),
        new Filter("age", Operator.GREATER_THAN, "18")
      ];
      const order = new Order("name", OrderOption.ASC);
      const limit = 10;
      const offset = 5;

      const criteria = new Criteria(filters, order, limit, offset);

      expect(criteria.filters).toEqual(filters);
      expect(criteria.order).toEqual(order);
      expect(criteria.limit).toBe(limit);
      expect(criteria.offset).toBe(offset);
    });

    it("should create criteria with default values when optional parameters are not provided", () => {
      const filters = [new Filter("name", Operator.EQUAL, "John")];

      const criteria = new Criteria(filters);

      expect(criteria.filters).toEqual(filters);
      expect(criteria.order).toBeUndefined();
      expect(criteria.limit).toBe(0);
      expect(criteria.offset).toBe(0);
    });

    it("should create criteria with empty filters array", () => {
      const criteria = new Criteria([]);

      expect(criteria.filters).toEqual([]);
      expect(criteria.order).toBeUndefined();
      expect(criteria.limit).toBe(0);
      expect(criteria.offset).toBe(0);
    });

    it("should create criteria with order but no limit and offset", () => {
      const filters = [new Filter("name", Operator.EQUAL, "John")];
      const order = new Order("name", OrderOption.DESC);

      const criteria = new Criteria(filters, order);

      expect(criteria.filters).toEqual(filters);
      expect(criteria.order).toEqual(order);
      expect(criteria.limit).toBe(0);
      expect(criteria.offset).toBe(0);
    });

    it("should create criteria with limit and offset but no order", () => {
      const filters = [new Filter("name", Operator.EQUAL, "John")];
      const limit = 20;
      const offset = 10;

      const criteria = new Criteria(filters, undefined, limit, offset);

      expect(criteria.filters).toEqual(filters);
      expect(criteria.order).toBeUndefined();
      expect(criteria.limit).toBe(limit);
      expect(criteria.offset).toBe(offset);
    });
  });

  describe("properties", () => {
    it("should have readonly filters property", () => {
      const filters = [new Filter("name", Operator.EQUAL, "John")];
      const criteria = new Criteria(filters);

      expect(criteria.filters).toBeDefined();
      expect(Array.isArray(criteria.filters)).toBe(true);
    });

    it("should have readonly order property", () => {
      const order = new Order("name", OrderOption.ASC);
      const criteria = new Criteria([], order);

      expect(criteria.order).toBeDefined();
      expect(criteria.order).toEqual(order);
    });

    it("should have readonly limit property", () => {
      const limit = 15;
      const criteria = new Criteria([], undefined, limit);

      expect(criteria.limit).toBeDefined();
      expect(typeof criteria.limit).toBe("number");
    });

    it("should have readonly offset property", () => {
      const offset = 25;
      const criteria = new Criteria([], undefined, 0, offset);

      expect(criteria.offset).toBeDefined();
      expect(typeof criteria.offset).toBe("number");
    });
  });

  describe("complex scenarios", () => {
    it("should handle multiple filters with different operators", () => {
      const filters = [
        new Filter("name", Operator.EQUAL, "John"),
        new Filter("age", Operator.GREATER_THAN_OR_EQUAL, "18"),
        new Filter("email", Operator.NOT_EQUAL, "test@example.com"),
        new Filter("created_at", Operator.LESS_THAN, "2024-01-01")
      ];
      const order = new Order("created_at", OrderOption.DESC);
      const limit = 50;
      const offset = 100;

      const criteria = new Criteria(filters, order, limit, offset);

      expect(criteria.filters).toHaveLength(4);
      expect(criteria.filters[0].field).toBe("name");
      expect(criteria.filters[0].operator).toBe(Operator.EQUAL);
      expect(criteria.filters[1].field).toBe("age");
      expect(criteria.filters[1].operator).toBe(Operator.GREATER_THAN_OR_EQUAL);
      expect(criteria.order?.field).toBe("created_at");
      expect(criteria.order?.direction).toBe(OrderOption.DESC);
      expect(criteria.limit).toBe(50);
      expect(criteria.offset).toBe(100);
    });

    it("should handle zero values for limit and offset", () => {
      const criteria = new Criteria([], undefined, 0, 0);

      expect(criteria.limit).toBe(0);
      expect(criteria.offset).toBe(0);
    });

    it("should handle negative values for limit and offset", () => {
      const criteria = new Criteria([], undefined, -5, -10);

      expect(criteria.limit).toBe(-5);
      expect(criteria.offset).toBe(-10);
    });
  });
}); 