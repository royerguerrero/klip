import { Criteria } from "../../../domain/criteria/Criteria";
import { Filter } from "../../../domain/criteria/Filter";
import { Order, OrderOption } from "../../../domain/criteria/Order";
import { Operator } from "../../../domain/criteria/Operator";

describe("Criteria Module", () => {
  describe("module structure", () => {
    it("should export all required classes and enums", () => {
      expect(Criteria).toBeDefined();
      expect(Filter).toBeDefined();
      expect(Order).toBeDefined();
      expect(OrderOption).toBeDefined();
      expect(Operator).toBeDefined();
    });

    it("should have proper class relationships", () => {
      // Criteria uses Filter and Order
      const filter = new Filter("test", Operator.EQUAL, "value");
      const order = new Order("test", OrderOption.ASC);
      const criteria = new Criteria([filter], order);

      expect(criteria.filters).toContain(filter);
      expect(criteria.order).toBe(order);
    });

    it("should have proper enum relationships", () => {
      // Filter uses Operator
      const filter = new Filter("test", Operator.EQUAL, "value");
      expect(filter.operator).toBe(Operator.EQUAL);

      // Order uses OrderOption
      const order = new Order("test", OrderOption.ASC);
      expect(order.direction).toBe(OrderOption.ASC);
    });
  });

  describe("complete workflow example", () => {
    it("should demonstrate a complete search workflow", () => {
      // 1. Define search criteria
      const searchFilters = [
        new Filter("name", Operator.EQUAL, "John"),
        new Filter("age", Operator.GREATER_THAN_OR_EQUAL, "18"),
        new Filter("status", Operator.EQUAL, "active")
      ];

      // 2. Define sorting
      const sortOrder = new Order("created_at", OrderOption.DESC);

      // 3. Define pagination
      const limit = 20;
      const offset = 0;

      // 4. Create criteria object
      const searchCriteria = new Criteria(searchFilters, sortOrder, limit, offset);

      // 5. Verify the complete criteria
      expect(searchCriteria.filters).toHaveLength(3);
      expect(searchCriteria.filters[0].field).toBe("name");
      expect(searchCriteria.filters[0].operator).toBe(Operator.EQUAL);
      expect(searchCriteria.filters[0].value).toBe("John");
      expect(searchCriteria.filters[1].field).toBe("age");
      expect(searchCriteria.filters[1].operator).toBe(Operator.GREATER_THAN_OR_EQUAL);
      expect(searchCriteria.filters[1].value).toBe("18");
      expect(searchCriteria.filters[2].field).toBe("status");
      expect(searchCriteria.filters[2].operator).toBe(Operator.EQUAL);
      expect(searchCriteria.filters[2].value).toBe("active");
      expect(searchCriteria.order?.field).toBe("created_at");
      expect(searchCriteria.order?.direction).toBe(OrderOption.DESC);
      expect(searchCriteria.limit).toBe(20);
      expect(searchCriteria.offset).toBe(0);
    });

    it("should demonstrate different search scenarios", () => {
      // Scenario 1: Simple filtering
      const simpleCriteria = new Criteria([
        new Filter("category", Operator.EQUAL, "electronics")
      ]);

      // Scenario 2: Filtering with sorting
      const sortedCriteria = new Criteria([
        new Filter("price", Operator.LESS_THAN, "1000")
      ], new Order("price", OrderOption.ASC));

      // Scenario 3: Pagination only
      const paginatedCriteria = new Criteria([], undefined, 10, 20);

      // Scenario 4: Complete search
      const completeCriteria = new Criteria([
        new Filter("brand", Operator.EQUAL, "Apple"),
        new Filter("price", Operator.GREATER_THAN_OR_EQUAL, "500")
      ], new Order("name", OrderOption.ASC), 25, 50);

      // Verify all scenarios work correctly
      expect(simpleCriteria.filters).toHaveLength(1);
      expect(simpleCriteria.order).toBeUndefined();
      expect(simpleCriteria.limit).toBe(0);
      expect(simpleCriteria.offset).toBe(0);

      expect(sortedCriteria.filters).toHaveLength(1);
      expect(sortedCriteria.order?.field).toBe("price");
      expect(sortedCriteria.order?.direction).toBe(OrderOption.ASC);
      expect(sortedCriteria.limit).toBe(0);
      expect(sortedCriteria.offset).toBe(0);

      expect(paginatedCriteria.filters).toHaveLength(0);
      expect(paginatedCriteria.order).toBeUndefined();
      expect(paginatedCriteria.limit).toBe(10);
      expect(paginatedCriteria.offset).toBe(20);

      expect(completeCriteria.filters).toHaveLength(2);
      expect(completeCriteria.order?.field).toBe("name");
      expect(completeCriteria.order?.direction).toBe(OrderOption.ASC);
      expect(completeCriteria.limit).toBe(25);
      expect(completeCriteria.offset).toBe(50);
    });
  });

  describe("type safety and immutability", () => {
    it("should maintain type safety across all components", () => {
      // All properties should be readonly and properly typed
      const filter = new Filter("field", Operator.EQUAL, "value");
      const order = new Order("field", OrderOption.ASC);
      const criteria = new Criteria([filter], order, 10, 5);

      // Verify types
      expect(typeof filter.field).toBe("string");
      expect(typeof filter.operator).toBe("string");
      expect(typeof filter.value).toBe("string");
      expect(typeof order.field).toBe("string");
      expect(typeof order.direction).toBe("string");
      expect(typeof criteria.limit).toBe("number");
      expect(typeof criteria.offset).toBe("number");
      expect(Array.isArray(criteria.filters)).toBe(true);
    });

    it("should ensure enum values are valid", () => {
      const validOperators = Object.values(Operator);
      const validOrderOptions = Object.values(OrderOption);

      expect(validOperators).toContain("=");
      expect(validOperators).toContain("!=");
      expect(validOperators).toContain(">");
      expect(validOperators).toContain(">=");
      expect(validOperators).toContain("<");
      expect(validOperators).toContain("<=");
      expect(validOperators).toContain("AND");
      expect(validOperators).toContain("OR");

      expect(validOrderOptions).toContain("ASC");
      expect(validOrderOptions).toContain("DESC");
    });
  });

  describe("extensibility and maintainability", () => {
    it("should be easy to extend with new operators", () => {
      // The current structure makes it easy to add new operators
      const currentOperatorCount = Object.values(Operator).length;
      expect(currentOperatorCount).toBe(8); // 6 comparison + 2 logical

      // Adding new operators would just require extending the enum
      // and updating the tests accordingly
    });

    it("should be easy to extend with new order options", () => {
      // The current structure makes it easy to add new order options
      const currentOrderOptionCount = Object.values(OrderOption).length;
      expect(currentOrderOptionCount).toBe(2); // ASC and DESC

      // Adding new order options would just require extending the enum
      // and updating the tests accordingly
    });

    it("should maintain backward compatibility", () => {
      // Existing code should continue to work when new features are added
      const legacyCriteria = new Criteria([
        new Filter("name", Operator.EQUAL, "John")
      ]);

      expect(legacyCriteria.filters).toHaveLength(1);
      expect(legacyCriteria.filters[0].field).toBe("name");
      expect(legacyCriteria.filters[0].operator).toBe(Operator.EQUAL);
      expect(legacyCriteria.filters[0].value).toBe("John");
    });
  });
}); 