import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class CustomerDateOfBirth implements ValueObject {
  constructor(readonly value: Date) {

  }
}
