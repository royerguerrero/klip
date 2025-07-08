import { Filter } from "../../../domain/criteria/Filter";
import { Operator } from "../../../domain/criteria/Operator";

describe("Filter", () => {
  describe("constructor", () => {
    it("should create filter with all properties", () => {
      const field = "name";
      const operator = Operator.EQUAL;
      const value = "John Doe";

      const filter = new Filter(field, operator, value);

      expect(filter.field).toBe(field);
      expect(filter.operator).toBe(operator);
      expect(filter.value).toBe(value);
    });

    it("should create filter with different operators", () => {
      const testCases = [
        { operator: Operator.EQUAL, value: "test" },
        { operator: Operator.NOT_EQUAL, value: "test" },
        { operator: Operator.GREATER_THAN, value: "10" },
        { operator: Operator.GREATER_THAN_OR_EQUAL, value: "10" },
        { operator: Operator.LESS_THAN, value: "100" },
        { operator: Operator.LESS_THAN_OR_EQUAL, value: "100" },
        { operator: Operator.AND, value: "condition" },
        { operator: Operator.OR, value: "condition" }
      ];

      testCases.forEach(({ operator, value }) => {
        const filter = new Filter("field", operator, value);
        expect(filter.operator).toBe(operator);
        expect(filter.value).toBe(value);
      });
    });

    it("should create filter with empty string values", () => {
      const filter = new Filter("name", Operator.EQUAL, "");

      expect(filter.field).toBe("name");
      expect(filter.operator).toBe(Operator.EQUAL);
      expect(filter.value).toBe("");
    });

    it("should create filter with numeric string values", () => {
      const filter = new Filter("age", Operator.GREATER_THAN, "18");

      expect(filter.field).toBe("age");
      expect(filter.operator).toBe(Operator.GREATER_THAN);
      expect(filter.value).toBe("18");
    });

    it("should create filter with special characters in field name", () => {
      const field = "user_name";
      const filter = new Filter(field, Operator.EQUAL, "test");

      expect(filter.field).toBe(field);
    });

    it("should create filter with complex field names", () => {
      const field = "user.profile.email";
      const filter = new Filter(field, Operator.EQUAL, "test@example.com");

      expect(filter.field).toBe(field);
      expect(filter.value).toBe("test@example.com");
    });
  });

  describe("properties", () => {
    it("should have readonly field property", () => {
      const filter = new Filter("test_field", Operator.EQUAL, "test_value");

      expect(filter.field).toBeDefined();
      expect(typeof filter.field).toBe("string");
    });

    it("should have readonly operator property", () => {
      const filter = new Filter("test_field", Operator.NOT_EQUAL, "test_value");

      expect(filter.operator).toBeDefined();
      expect(Object.values(Operator)).toContain(filter.operator);
    });

    it("should have readonly value property", () => {
      const filter = new Filter("test_field", Operator.EQUAL, "test_value");

      expect(filter.value).toBeDefined();
      expect(typeof filter.value).toBe("string");
    });
  });

  describe("edge cases", () => {
    it("should handle very long field names", () => {
      const longFieldName = "a".repeat(1000);
      const filter = new Filter(longFieldName, Operator.EQUAL, "test");

      expect(filter.field).toBe(longFieldName);
    });

    it("should handle very long values", () => {
      const longValue = "b".repeat(1000);
      const filter = new Filter("field", Operator.EQUAL, longValue);

      expect(filter.value).toBe(longValue);
    });

    it("should handle whitespace in field names", () => {
      const filter = new Filter("  field  ", Operator.EQUAL, "test");

      expect(filter.field).toBe("  field  ");
    });

    it("should handle whitespace in values", () => {
      const filter = new Filter("field", Operator.EQUAL, "  test  ");

      expect(filter.value).toBe("  test  ");
    });

    it("should handle unicode characters", () => {
      const unicodeField = "fïéld_ñámé";
      const unicodeValue = "välüé_ñ";
      const filter = new Filter(unicodeField, Operator.EQUAL, unicodeValue);

      expect(filter.field).toBe(unicodeField);
      expect(filter.value).toBe(unicodeValue);
    });
  });

  describe("comparison operators", () => {
    it("should work with all comparison operators", () => {
      const operators = [
        Operator.EQUAL,
        Operator.NOT_EQUAL,
        Operator.GREATER_THAN,
        Operator.GREATER_THAN_OR_EQUAL,
        Operator.LESS_THAN,
        Operator.LESS_THAN_OR_EQUAL
      ];

      operators.forEach(operator => {
        const filter = new Filter("field", operator, "value");
        expect(filter.operator).toBe(operator);
      });
    });

    it("should work with logical operators", () => {
      const logicalOperators = [Operator.AND, Operator.OR];

      logicalOperators.forEach(operator => {
        const filter = new Filter("field", operator, "condition");
        expect(filter.operator).toBe(operator);
      });
    });
  });
}); 