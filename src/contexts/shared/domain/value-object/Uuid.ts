import { v4 as uuid, validate } from "uuid";
import { ValueObject } from "@/contexts/shared/domain/ValueObject";

export class UUID implements ValueObject {
  constructor(public value: string) {
    this.ensureIsValidUUID(value);
  }

  static nextId() {
    return new UUID(uuid());
  }

  ensureIsValidUUID(id: string): void {
    if (!validate(id)) {
      throw new Error(`The UUID ${id} is not valid`);
    }
  }

  equals(id: UUID): boolean {
    return this.value === id.value;
  }

  notEquals(id: UUID): boolean {
    return !this.equals(id);
  }
}
