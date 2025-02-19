import { UUID } from "@/contexts/shared/domain/value-object/Uuid";
import { describe, expect, it } from "@jest/globals";

describe("UUID", () => {
  it("should create a valid UUID", () => {
    const uuid = UUID.nextId();
    console.log(uuid);
    expect(uuid).toBeInstanceOf(UUID);
    expect(uuid.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it("should throw an error for an invalid UUID", () => {
    expect(() => new UUID("invalid-uuid")).toThrowError(
      "The UUID invalid-uuid is not valid"
    );
  });

  it("should validate a correct UUID", () => {
    const validUUID = "123e4567-e89b-12d3-a456-426614174000";
    const uuid = new UUID(validUUID);
    expect(uuid.value).toBe(validUUID);
  });
});
