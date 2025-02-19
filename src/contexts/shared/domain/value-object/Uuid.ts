import { ValueObject } from "./ValueObject";
import { v4 as uuid, validate } from "uuid";

export class UUID extends ValueObject {
  constructor(public value: string) {
    super();
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
}
