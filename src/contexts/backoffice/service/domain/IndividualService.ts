import { Entity } from "@/contexts/shared/domain/Entity";
import { IndividualServiceId } from "./IndividualServiceId";

export class IndividualService extends Entity {
  constructor(readonly id: IndividualServiceId) {
    super();
  }

  toPrimitives(): object {
    throw new Error("Method not implemented.");
  }
}
