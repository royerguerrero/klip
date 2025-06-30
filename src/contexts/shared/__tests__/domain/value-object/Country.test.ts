import { Country } from "../../../domain/value-object/Country";

describe("Country", () => {
  describe("constructor", () => {
    it("should create country with all properties", () => {
      const country = new Country(
        "US",
        "United States",
        "+1",
        "USD",
        ["passport", "drivers_license"]
      );

      expect(country.value).toBe("US");
      expect(country.name).toBe("United States");
      expect(country.prefix).toBe("+1");
      expect(country.currency).toBe("USD");
      expect(country.documentTypes).toEqual(["passport", "drivers_license"]);
    });
  });

  describe("equals", () => {
    it("should return true for countries with same value", () => {
      const country1 = new Country("US", "United States", "+1", "USD", ["passport"]);
      const country2 = new Country("US", "United States", "+1", "USD", ["passport"]);

      expect(country1.equals(country2)).toBe(true);
    });

    it("should return false for countries with different values", () => {
      const country1 = new Country("US", "United States", "+1", "USD", ["passport"]);
      const country2 = new Country("CA", "Canada", "+1", "CAD", ["passport"]);

      expect(country1.equals(country2)).toBe(false);
    });

    it("should only compare value property, not other properties", () => {
      const country1 = new Country("US", "United States", "+1", "USD", ["passport"]);
      const country2 = new Country("US", "Canada", "+1", "CAD", ["drivers_license"]);

      expect(country1.equals(country2)).toBe(true); // Same value "US"
    });
  });

  describe("notEquals", () => {
    it("should return true for countries with different values", () => {
      const country1 = new Country("US", "United States", "+1", "USD", ["passport"]);
      const country2 = new Country("CA", "Canada", "+1", "CAD", ["passport"]);

      expect(country1.notEquals(country2)).toBe(true);
    });

    it("should return false for countries with same value", () => {
      const country1 = new Country("US", "United States", "+1", "USD", ["passport"]);
      const country2 = new Country("US", "United States", "+1", "USD", ["passport"]);

      expect(country1.notEquals(country2)).toBe(false);
    });
  });

  describe("properties", () => {
    it("should have readonly properties", () => {
      const country = new Country("US", "United States", "+1", "USD", ["passport"]);

      expect(country.value).toBe("US");
      expect(country.name).toBe("United States");
      expect(country.prefix).toBe("+1");
      expect(country.currency).toBe("USD");
      expect(country.documentTypes).toEqual(["passport"]);
    });
  });
}); 