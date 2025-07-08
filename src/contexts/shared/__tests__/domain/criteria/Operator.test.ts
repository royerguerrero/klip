import { Operator } from "../../../domain/criteria/Operator";

describe("Operator", () => {
  describe("enum values", () => {
    it("should have EQUAL operator", () => {
      expect(Operator.EQUAL).toBe("=");
    });

    it("should have NOT_EQUAL operator", () => {
      expect(Operator.NOT_EQUAL).toBe("!=");
    });

    it("should have GREATER_THAN operator", () => {
      expect(Operator.GREATER_THAN).toBe(">");
    });

    it("should have GREATER_THAN_OR_EQUAL operator", () => {
      expect(Operator.GREATER_THAN_OR_EQUAL).toBe(">=");
    });

    it("should have LESS_THAN operator", () => {
      expect(Operator.LESS_THAN).toBe("<");
    });

    it("should have LESS_THAN_OR_EQUAL operator", () => {
      expect(Operator.LESS_THAN_OR_EQUAL).toBe("<=");
    });

    it("should have AND operator", () => {
      expect(Operator.AND).toBe("AND");
    });

    it("should have OR operator", () => {
      expect(Operator.OR).toBe("OR");
    });
  });

  describe("enum structure", () => {
    it("should have exactly 8 operators", () => {
      const values = Object.values(Operator);
      expect(values).toHaveLength(8);
    });

    it("should have unique values", () => {
      const values = Object.values(Operator);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });

    it("should contain all expected operators", () => {
      const expectedOperators = [
        "=", "!=", ">", ">=", "<", "<=", "AND", "OR"
      ];
      
      const actualOperators = Object.values(Operator);
      expectedOperators.forEach(operator => {
        expect(actualOperators).toContain(operator);
      });
    });
  });

  describe("comparison operators", () => {
    it("should have all comparison operators", () => {
      const comparisonOperators = [
        Operator.EQUAL,
        Operator.NOT_EQUAL,
        Operator.GREATER_THAN,
        Operator.GREATER_THAN_OR_EQUAL,
        Operator.LESS_THAN,
        Operator.LESS_THAN_OR_EQUAL
      ];

      expect(comparisonOperators).toHaveLength(6);
      expect(comparisonOperators).toContain("=");
      expect(comparisonOperators).toContain("!=");
      expect(comparisonOperators).toContain(">");
      expect(comparisonOperators).toContain(">=");
      expect(comparisonOperators).toContain("<");
      expect(comparisonOperators).toContain("<=");
    });

    it("should have proper comparison operator symbols", () => {
      expect(Operator.EQUAL).toBe("=");
      expect(Operator.NOT_EQUAL).toBe("!=");
      expect(Operator.GREATER_THAN).toBe(">");
      expect(Operator.GREATER_THAN_OR_EQUAL).toBe(">=");
      expect(Operator.LESS_THAN).toBe("<");
      expect(Operator.LESS_THAN_OR_EQUAL).toBe("<=");
    });
  });

  describe("logical operators", () => {
    it("should have all logical operators", () => {
      const logicalOperators = [
        Operator.AND,
        Operator.OR
      ];

      expect(logicalOperators).toHaveLength(2);
      expect(logicalOperators).toContain("AND");
      expect(logicalOperators).toContain("OR");
    });

    it("should have proper logical operator values", () => {
      expect(Operator.AND).toBe("AND");
      expect(Operator.OR).toBe("OR");
    });
  });

  describe("enum usage", () => {
    it("should allow comparison with string literals", () => {
      expect(Operator.EQUAL).toBe("=");
      expect(Operator.NOT_EQUAL).toBe("!=");
      expect(Operator.GREATER_THAN).toBe(">");
      expect(Operator.GREATER_THAN_OR_EQUAL).toBe(">=");
      expect(Operator.LESS_THAN).toBe("<");
      expect(Operator.LESS_THAN_OR_EQUAL).toBe("<=");
      expect(Operator.AND).toBe("AND");
      expect(Operator.OR).toBe("OR");
    });

    it("should be usable in switch statements", () => {
      const getOperatorType = (operator: Operator): string => {
        switch (operator) {
          case Operator.EQUAL:
          case Operator.NOT_EQUAL:
          case Operator.GREATER_THAN:
          case Operator.GREATER_THAN_OR_EQUAL:
          case Operator.LESS_THAN:
          case Operator.LESS_THAN_OR_EQUAL:
            return "comparison";
          case Operator.AND:
          case Operator.OR:
            return "logical";
          default:
            return "unknown";
        }
      };

      expect(getOperatorType(Operator.EQUAL)).toBe("comparison");
      expect(getOperatorType(Operator.NOT_EQUAL)).toBe("comparison");
      expect(getOperatorType(Operator.GREATER_THAN)).toBe("comparison");
      expect(getOperatorType(Operator.GREATER_THAN_OR_EQUAL)).toBe("comparison");
      expect(getOperatorType(Operator.LESS_THAN)).toBe("comparison");
      expect(getOperatorType(Operator.LESS_THAN_OR_EQUAL)).toBe("comparison");
      expect(getOperatorType(Operator.AND)).toBe("logical");
      expect(getOperatorType(Operator.OR)).toBe("logical");
    });

    it("should be usable in conditional statements", () => {
      const isComparisonOperator = (operator: Operator): boolean => {
        return [
          Operator.EQUAL,
          Operator.NOT_EQUAL,
          Operator.GREATER_THAN,
          Operator.GREATER_THAN_OR_EQUAL,
          Operator.LESS_THAN,
          Operator.LESS_THAN_OR_EQUAL
        ].includes(operator);
      };

      expect(isComparisonOperator(Operator.EQUAL)).toBe(true);
      expect(isComparisonOperator(Operator.NOT_EQUAL)).toBe(true);
      expect(isComparisonOperator(Operator.GREATER_THAN)).toBe(true);
      expect(isComparisonOperator(Operator.GREATER_THAN_OR_EQUAL)).toBe(true);
      expect(isComparisonOperator(Operator.LESS_THAN)).toBe(true);
      expect(isComparisonOperator(Operator.LESS_THAN_OR_EQUAL)).toBe(true);
      expect(isComparisonOperator(Operator.AND)).toBe(false);
      expect(isComparisonOperator(Operator.OR)).toBe(false);
    });

    it("should be usable in array operations", () => {
      const allOperators = Object.values(Operator);
      const comparisonOperators = allOperators.filter(op => 
        [Operator.EQUAL, Operator.NOT_EQUAL, Operator.GREATER_THAN, 
         Operator.GREATER_THAN_OR_EQUAL, Operator.LESS_THAN, Operator.LESS_THAN_OR_EQUAL].includes(op)
      );
      const logicalOperators = allOperators.filter(op => 
        [Operator.AND, Operator.OR].includes(op)
      );

      expect(comparisonOperators).toHaveLength(6);
      expect(logicalOperators).toHaveLength(2);
    });
  });

  describe("operator categorization", () => {
    it("should categorize operators correctly", () => {
      const comparisonOperators = [
        Operator.EQUAL,
        Operator.NOT_EQUAL,
        Operator.GREATER_THAN,
        Operator.GREATER_THAN_OR_EQUAL,
        Operator.LESS_THAN,
        Operator.LESS_THAN_OR_EQUAL
      ];

      const logicalOperators = [
        Operator.AND,
        Operator.OR
      ];

      // Test that all operators are categorized
      const allOperators = Object.values(Operator);
      const categorizedOperators = [...comparisonOperators, ...logicalOperators];
      
      expect(categorizedOperators).toHaveLength(allOperators.length);
      allOperators.forEach(operator => {
        expect(categorizedOperators).toContain(operator);
      });
    });

    it("should have no overlap between operator categories", () => {
      const comparisonOperators = [
        Operator.EQUAL,
        Operator.NOT_EQUAL,
        Operator.GREATER_THAN,
        Operator.GREATER_THAN_OR_EQUAL,
        Operator.LESS_THAN,
        Operator.LESS_THAN_OR_EQUAL
      ];

      const logicalOperators = [
        Operator.AND,
        Operator.OR
      ];

      const overlap = comparisonOperators.filter(op => logicalOperators.includes(op));
      expect(overlap).toHaveLength(0);
    });
  });
}); 