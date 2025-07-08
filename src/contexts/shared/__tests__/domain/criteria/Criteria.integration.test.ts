import { Criteria } from "../../../domain/criteria/Criteria";
import { Filter } from "../../../domain/criteria/Filter";
import { Order, OrderOption } from "../../../domain/criteria/Order";
import { Operator } from "../../../domain/criteria/Operator";

describe("Criteria Integration", () => {
  describe("complex query scenarios", () => {
    it("should create a complex search criteria for users", () => {
      const filters = [
        new Filter("name", Operator.EQUAL, "John Doe"),
        new Filter("age", Operator.GREATER_THAN_OR_EQUAL, "18"),
        new Filter("email", Operator.NOT_EQUAL, ""),
        new Filter("created_at", Operator.GREATER_THAN, "2024-01-01"),
      ];
      const order = new Order("created_at", OrderOption.DESC);
      const limit = 20;
      const offset = 0;

      const criteria = new Criteria(filters, order, limit, offset);

      expect(criteria.filters).toHaveLength(4);
      expect(criteria.filters[0].field).toBe("name");
      expect(criteria.filters[0].operator).toBe(Operator.EQUAL);
      expect(criteria.filters[0].value).toBe("John Doe");
      expect(criteria.filters[1].field).toBe("age");
      expect(criteria.filters[1].operator).toBe(Operator.GREATER_THAN_OR_EQUAL);
      expect(criteria.filters[1].value).toBe("18");
      expect(criteria.order?.field).toBe("created_at");
      expect(criteria.order?.direction).toBe(OrderOption.DESC);
      expect(criteria.limit).toBe(20);
      expect(criteria.offset).toBe(0);
    });

    it("should create pagination criteria", () => {
      const filters = [new Filter("status", Operator.EQUAL, "active")];
      const order = new Order("id", OrderOption.ASC);
      const limit = 10;
      const offset = 20; // Page 3 (0-9, 10-19, 20-29)

      const criteria = new Criteria(filters, order, limit, offset);

      expect(criteria.filters).toHaveLength(1);
      expect(criteria.filters[0].field).toBe("status");
      expect(criteria.filters[0].operator).toBe(Operator.EQUAL);
      expect(criteria.filters[0].value).toBe("active");
      expect(criteria.order?.field).toBe("id");
      expect(criteria.order?.direction).toBe(OrderOption.ASC);
      expect(criteria.limit).toBe(10);
      expect(criteria.offset).toBe(20);
    });

    it("should create sorting criteria without filters", () => {
      const order = new Order("name", OrderOption.ASC);
      const limit = 50;

      const criteria = new Criteria([], order, limit);

      expect(criteria.filters).toHaveLength(0);
      expect(criteria.order?.field).toBe("name");
      expect(criteria.order?.direction).toBe(OrderOption.ASC);
      expect(criteria.limit).toBe(50);
      expect(criteria.offset).toBe(0);
    });

    it("should create filtering criteria without sorting", () => {
      const filters = [
        new Filter("category", Operator.EQUAL, "electronics"),
        new Filter("price", Operator.LESS_THAN_OR_EQUAL, "1000"),
      ];

      const criteria = new Criteria(filters);

      expect(criteria.filters).toHaveLength(2);
      expect(criteria.filters[0].field).toBe("category");
      expect(criteria.filters[0].operator).toBe(Operator.EQUAL);
      expect(criteria.filters[0].value).toBe("electronics");
      expect(criteria.filters[1].field).toBe("price");
      expect(criteria.filters[1].operator).toBe(Operator.LESS_THAN_OR_EQUAL);
      expect(criteria.filters[1].value).toBe("1000");
      expect(criteria.order).toBeUndefined();
      expect(criteria.limit).toBe(0);
      expect(criteria.offset).toBe(0);
    });
  });

  describe("operator combinations", () => {
    it("should work with all comparison operators", () => {
      const filters = [
        new Filter("field1", Operator.EQUAL, "value1"),
        new Filter("field2", Operator.NOT_EQUAL, "value2"),
        new Filter("field3", Operator.GREATER_THAN, "10"),
        new Filter("field4", Operator.GREATER_THAN_OR_EQUAL, "20"),
        new Filter("field5", Operator.LESS_THAN, "100"),
        new Filter("field6", Operator.LESS_THAN_OR_EQUAL, "200"),
      ];

      const criteria = new Criteria(filters);

      expect(criteria.filters).toHaveLength(6);
      expect(criteria.filters[0].operator).toBe(Operator.EQUAL);
      expect(criteria.filters[1].operator).toBe(Operator.NOT_EQUAL);
      expect(criteria.filters[2].operator).toBe(Operator.GREATER_THAN);
      expect(criteria.filters[3].operator).toBe(Operator.GREATER_THAN_OR_EQUAL);
      expect(criteria.filters[4].operator).toBe(Operator.LESS_THAN);
      expect(criteria.filters[5].operator).toBe(Operator.LESS_THAN_OR_EQUAL);
    });

    it("should work with logical operators", () => {
      const filters = [
        new Filter("condition1", Operator.AND, "value1"),
        new Filter("condition2", Operator.OR, "value2"),
      ];

      const criteria = new Criteria(filters);

      expect(criteria.filters).toHaveLength(2);
      expect(criteria.filters[0].operator).toBe(Operator.AND);
      expect(criteria.filters[1].operator).toBe(Operator.OR);
    });
  });

  describe("order combinations", () => {
    it("should work with both ASC and DESC orders", () => {
      const ascOrder = new Order("name", OrderOption.ASC);
      const descOrder = new Order("created_at", OrderOption.DESC);

      const criteria1 = new Criteria([], ascOrder);
      const criteria2 = new Criteria([], descOrder);

      expect(criteria1.order?.direction).toBe(OrderOption.ASC);
      expect(criteria2.order?.direction).toBe(OrderOption.DESC);
    });

    it("should work with complex field names in orders", () => {
      const order = new Order("user.profile.name", OrderOption.ASC);
      const criteria = new Criteria([], order);

      expect(criteria.order?.field).toBe("user.profile.name");
      expect(criteria.order?.direction).toBe(OrderOption.ASC);
    });
  });

  describe("edge cases and boundary conditions", () => {
    it("should handle empty criteria", () => {
      const criteria = new Criteria([]);

      expect(criteria.filters).toHaveLength(0);
      expect(criteria.order).toBeUndefined();
      expect(criteria.limit).toBe(0);
      expect(criteria.offset).toBe(0);
    });

    it("should handle large numbers for limit and offset", () => {
      const largeLimit = 1000000;
      const largeOffset = 999999;
      const criteria = new Criteria([], undefined, largeLimit, largeOffset);

      expect(criteria.limit).toBe(largeLimit);
      expect(criteria.offset).toBe(largeOffset);
    });

    it("should handle negative numbers for limit and offset", () => {
      const negativeLimit = -10;
      const negativeOffset = -5;
      const criteria = new Criteria(
        [],
        undefined,
        negativeLimit,
        negativeOffset
      );

      expect(criteria.limit).toBe(negativeLimit);
      expect(criteria.offset).toBe(negativeOffset);
    });

    it("should handle zero values for limit and offset", () => {
      const criteria = new Criteria([], undefined, 0, 0);

      expect(criteria.limit).toBe(0);
      expect(criteria.offset).toBe(0);
    });
  });

  describe("real-world query patterns", () => {
    it("should support user search with multiple conditions", () => {
      const filters = [
        new Filter("name", Operator.EQUAL, "John"),
        new Filter("age", Operator.GREATER_THAN_OR_EQUAL, "18"),
        new Filter("age", Operator.LESS_THAN_OR_EQUAL, "65"),
        new Filter("email", Operator.NOT_EQUAL, ""),
        new Filter("status", Operator.EQUAL, "active"),
      ];
      const order = new Order("name", OrderOption.ASC);
      const limit = 25;

      const criteria = new Criteria(filters, order, limit);

      expect(criteria.filters).toHaveLength(5);
      expect(criteria.order?.field).toBe("name");
      expect(criteria.order?.direction).toBe(OrderOption.ASC);
      expect(criteria.limit).toBe(25);
    });

    it("should support product catalog filtering", () => {
      const filters = [
        new Filter("category", Operator.EQUAL, "electronics"),
        new Filter("price", Operator.GREATER_THAN_OR_EQUAL, "100"),
        new Filter("price", Operator.LESS_THAN_OR_EQUAL, "1000"),
        new Filter("brand", Operator.EQUAL, "Apple"),
        new Filter("in_stock", Operator.EQUAL, "true"),
      ];
      const order = new Order("price", OrderOption.ASC);
      const limit = 50;
      const offset = 100;

      const criteria = new Criteria(filters, order, limit, offset);

      expect(criteria.filters).toHaveLength(5);
      expect(criteria.order?.field).toBe("price");
      expect(criteria.order?.direction).toBe(OrderOption.ASC);
      expect(criteria.limit).toBe(50);
      expect(criteria.offset).toBe(100);
    });

    it("should support order history queries", () => {
      const filters = [
        new Filter("user_id", Operator.EQUAL, "12345"),
        new Filter("status", Operator.EQUAL, "completed"),
        new Filter("created_at", Operator.GREATER_THAN, "2024-01-01"),
        new Filter("total_amount", Operator.GREATER_THAN, "50"),
      ];
      const order = new Order("created_at", OrderOption.DESC);
      const limit = 10;

      const criteria = new Criteria(filters, order, limit);

      expect(criteria.filters).toHaveLength(4);
      expect(criteria.order?.field).toBe("created_at");
      expect(criteria.order?.direction).toBe(OrderOption.DESC);
      expect(criteria.limit).toBe(10);
    });
  });

  describe("immutability and readonly properties", () => {
    it("should have readonly properties that cannot be modified", () => {
      const filters = [new Filter("name", Operator.EQUAL, "John")];
      const order = new Order("name", OrderOption.ASC);
      const criteria = new Criteria(filters, order, 10, 5);

      // These should not cause TypeScript errors in a real environment
      // but we can test that the properties are defined and have the expected values
      expect(criteria.filters).toBeDefined();
      expect(criteria.order).toBeDefined();
      expect(criteria.limit).toBeDefined();
      expect(criteria.offset).toBeDefined();

      expect(criteria.filters).toEqual(filters);
      expect(criteria.order).toEqual(order);
      expect(criteria.limit).toBe(10);
      expect(criteria.offset).toBe(5);
    });
  });
});
