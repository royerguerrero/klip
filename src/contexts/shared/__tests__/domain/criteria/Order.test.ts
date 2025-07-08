import { Order, OrderOption } from "../../../domain/criteria/Order";

describe("Order", () => {
  describe("constructor", () => {
    it("should create order with all properties", () => {
      const field = "name";
      const direction = OrderOption.ASC;

      const order = new Order(field, direction);

      expect(order.field).toBe(field);
      expect(order.direction).toBe(direction);
    });

    it("should create order with ASC direction", () => {
      const order = new Order("name", OrderOption.ASC);

      expect(order.field).toBe("name");
      expect(order.direction).toBe(OrderOption.ASC);
    });

    it("should create order with DESC direction", () => {
      const order = new Order("created_at", OrderOption.DESC);

      expect(order.field).toBe("created_at");
      expect(order.direction).toBe(OrderOption.DESC);
    });

    it("should create order with complex field names", () => {
      const field = "user.profile.name";
      const order = new Order(field, OrderOption.ASC);

      expect(order.field).toBe(field);
      expect(order.direction).toBe(OrderOption.ASC);
    });

    it("should create order with special characters in field name", () => {
      const field = "user_name";
      const order = new Order(field, OrderOption.DESC);

      expect(order.field).toBe(field);
      expect(order.direction).toBe(OrderOption.DESC);
    });
  });

  describe("properties", () => {
    it("should have readonly field property", () => {
      const order = new Order("test_field", OrderOption.ASC);

      expect(order.field).toBeDefined();
      expect(typeof order.field).toBe("string");
    });

    it("should have readonly direction property", () => {
      const order = new Order("test_field", OrderOption.DESC);

      expect(order.direction).toBeDefined();
      expect(Object.values(OrderOption)).toContain(order.direction);
    });
  });

  describe("edge cases", () => {
    it("should handle empty field names", () => {
      const order = new Order("", OrderOption.ASC);

      expect(order.field).toBe("");
      expect(order.direction).toBe(OrderOption.ASC);
    });

    it("should handle whitespace in field names", () => {
      const order = new Order("  field  ", OrderOption.DESC);

      expect(order.field).toBe("  field  ");
      expect(order.direction).toBe(OrderOption.DESC);
    });

    it("should handle very long field names", () => {
      const longFieldName = "a".repeat(1000);
      const order = new Order(longFieldName, OrderOption.ASC);

      expect(order.field).toBe(longFieldName);
      expect(order.direction).toBe(OrderOption.ASC);
    });

    it("should handle unicode characters in field names", () => {
      const unicodeField = "fïéld_ñámé";
      const order = new Order(unicodeField, OrderOption.DESC);

      expect(order.field).toBe(unicodeField);
      expect(order.direction).toBe(OrderOption.DESC);
    });
  });

  describe("field name patterns", () => {
    it("should handle camelCase field names", () => {
      const order = new Order("userName", OrderOption.ASC);
      expect(order.field).toBe("userName");
    });

    it("should handle snake_case field names", () => {
      const order = new Order("user_name", OrderOption.DESC);
      expect(order.field).toBe("user_name");
    });

    it("should handle kebab-case field names", () => {
      const order = new Order("user-name", OrderOption.ASC);
      expect(order.field).toBe("user-name");
    });

    it("should handle field names with numbers", () => {
      const order = new Order("user123", OrderOption.DESC);
      expect(order.field).toBe("user123");
    });

    it("should handle field names with dots", () => {
      const order = new Order("user.profile.name", OrderOption.ASC);
      expect(order.field).toBe("user.profile.name");
    });

    it("should handle field names with underscores and dots", () => {
      const order = new Order("user_profile.name", OrderOption.DESC);
      expect(order.field).toBe("user_profile.name");
    });
  });
});

describe("OrderOption", () => {
  describe("enum values", () => {
    it("should have ASC value", () => {
      expect(OrderOption.ASC).toBe("ASC");
    });

    it("should have DESC value", () => {
      expect(OrderOption.DESC).toBe("DESC");
    });

    it("should have exactly two values", () => {
      const values = Object.values(OrderOption);
      expect(values).toHaveLength(2);
      expect(values).toContain("ASC");
      expect(values).toContain("DESC");
    });

    it("should have unique values", () => {
      const values = Object.values(OrderOption);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });
  });

  describe("enum usage", () => {
    it("should work with ASC in Order constructor", () => {
      const order = new Order("field", OrderOption.ASC);
      expect(order.direction).toBe("ASC");
    });

    it("should work with DESC in Order constructor", () => {
      const order = new Order("field", OrderOption.DESC);
      expect(order.direction).toBe("DESC");
    });

    it("should allow comparison with string literals", () => {
      expect(OrderOption.ASC).toBe("ASC");
      expect(OrderOption.DESC).toBe("DESC");
    });

    it("should be usable in switch statements", () => {
      const testDirection = (direction: OrderOption): string => {
        switch (direction) {
          case OrderOption.ASC:
            return "ascending";
          case OrderOption.DESC:
            return "descending";
          default:
            return "unknown";
        }
      };

      expect(testDirection(OrderOption.ASC)).toBe("ascending");
      expect(testDirection(OrderOption.DESC)).toBe("descending");
    });
  });
}); 