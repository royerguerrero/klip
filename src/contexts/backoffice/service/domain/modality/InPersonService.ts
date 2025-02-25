import { Entity } from "@/contexts/shared/domain/Entity";
import { Address } from "@/contexts/shared/domain/value-object/Address";
import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class InPersonService implements ValueObject {
  constructor(readonly address: Address) {}
}
