import { UserId } from "../../domain/UserId";

describe("UserId", () => {
  describe("constructor", () => {
    it("should create a UserId with valid UUID", () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      const userId = new UserId(validUuid);

      expect(userId.value).toBe(validUuid);
    });

    it("should throw error with invalid UUID", () => {
      const invalidUuid = "invalid-uuid";

      expect(() => new UserId(invalidUuid)).toThrow();
    });

    it("should accept different valid UUIDs", () => {
      const uuid1 = "123e4567-e89b-12d3-a456-426614174000";
      const uuid2 = "987fcdeb-51a2-43d1-b789-123456789abc";

      const userId1 = new UserId(uuid1);
      const userId2 = new UserId(uuid2);

      expect(userId1.value).toBe(uuid1);
      expect(userId2.value).toBe(uuid2);
      expect(userId1.value).not.toBe(userId2.value);
    });
  });

  describe("value property", () => {
    it("should be accessible", () => {
      const uuid = "123e4567-e89b-12d3-a456-426614174000";
      const userId = new UserId(uuid);

      expect(userId.value).toBe(uuid);
    });

    it("should be readonly", () => {
      const userId = new UserId("123e4567-e89b-12d3-a456-426614174000");

      // The value property should be readonly (TypeScript will enforce this at compile time)
      expect(userId.value).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
  });

  describe("equals", () => {
    it("should return true for UserIds with same value", () => {
      const uuid = "123e4567-e89b-12d3-a456-426614174000";
      const userId1 = new UserId(uuid);
      const userId2 = new UserId(uuid);

      expect(userId1.equals(userId2)).toBe(true);
    });

    it("should return false for UserIds with different values", () => {
      const userId1 = new UserId("123e4567-e89b-12d3-a456-426614174000");
      const userId2 = new UserId("987fcdeb-51a2-43d1-b789-123456789abc");

      expect(userId1.equals(userId2)).toBe(false);
    });
  });

  describe("notEquals", () => {
    it("should return true for UserIds with different values", () => {
      const userId1 = new UserId("123e4567-e89b-12d3-a456-426614174000");
      const userId2 = new UserId("987fcdeb-51a2-43d1-b789-123456789abc");

      expect(userId1.notEquals(userId2)).toBe(true);
    });

    it("should return false for UserIds with same value", () => {
      const uuid = "123e4567-e89b-12d3-a456-426614174000";
      const userId1 = new UserId(uuid);
      const userId2 = new UserId(uuid);

      expect(userId1.notEquals(userId2)).toBe(false);
    });
  });
}); 