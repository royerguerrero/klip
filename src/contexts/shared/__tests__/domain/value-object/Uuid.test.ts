import { UUID } from "../../../domain/value-object/Uuid";

describe("UUID", () => {
  describe("constructor", () => {
    it("should create UUID with valid UUID string", () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      const uuid = new UUID(validUuid);

      expect(uuid.value).toBe(validUuid);
    });

    it("should throw error for invalid UUID", () => {
      const invalidUuids = [
        "invalid-uuid",
        "123e4567-e89b-12d3-a456",
        "not-a-uuid",
        "",
        "123e4567-e89b-12d3-a456-42661417400g", // invalid character
      ];

      invalidUuids.forEach((invalidUuid) => {
        expect(() => new UUID(invalidUuid)).toThrow(`The UUID ${invalidUuid} is not valid`);
      });
    });

    it("should accept valid UUID formats", () => {
      const validUuids = [
        "123e4567-e89b-12d3-a456-426614174000",
        "550e8400-e29b-41d4-a716-446655440000",
        "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
        "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
      ];

      validUuids.forEach((uuidStr) => {
        expect(() => new UUID(uuidStr)).not.toThrow();
      });
    });
  });

  describe("nextId", () => {
    it("should generate a new valid UUID", () => {
      const uuid = UUID.nextId();

      expect(uuid).toBeInstanceOf(UUID);
      expect(uuid.value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    it("should generate different UUIDs on each call", () => {
      const uuid1 = UUID.nextId();
      const uuid2 = UUID.nextId();

      expect(uuid1.value).not.toBe(uuid2.value);
    });
  });

  describe("equals", () => {
    it("should return true for UUIDs with same value", () => {
      const uuid1 = new UUID("123e4567-e89b-12d3-a456-426614174000");
      const uuid2 = new UUID("123e4567-e89b-12d3-a456-426614174000");

      expect(uuid1.equals(uuid2)).toBe(true);
    });

    it("should return false for UUIDs with different values", () => {
      const uuid1 = new UUID("123e4567-e89b-12d3-a456-426614174000");
      const uuid2 = new UUID("550e8400-e29b-41d4-a716-446655440000");

      expect(uuid1.equals(uuid2)).toBe(false);
    });
  });

  describe("notEquals", () => {
    it("should return true for UUIDs with different values", () => {
      const uuid1 = new UUID("123e4567-e89b-12d3-a456-426614174000");
      const uuid2 = new UUID("550e8400-e29b-41d4-a716-446655440000");

      expect(uuid1.notEquals(uuid2)).toBe(true);
    });

    it("should return false for UUIDs with same value", () => {
      const uuid1 = new UUID("123e4567-e89b-12d3-a456-426614174000");
      const uuid2 = new UUID("123e4567-e89b-12d3-a456-426614174000");

      expect(uuid1.notEquals(uuid2)).toBe(false);
    });
  });

  describe("value property", () => {
    it("should be accessible", () => {
      const uuid = new UUID("123e4567-e89b-12d3-a456-426614174000");

      expect(uuid.value).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
  });
}); 