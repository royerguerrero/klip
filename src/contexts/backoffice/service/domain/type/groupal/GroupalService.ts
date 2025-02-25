import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class GroupalService implements ValueObject {
  constructor(readonly maxParticipants: number) {
  }
}
