import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class ServiceAvailability implements ValueObject {
  constructor(readonly location: unknown) {}
}
