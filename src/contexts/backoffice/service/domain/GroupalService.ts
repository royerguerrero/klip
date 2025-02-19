import { Entity } from "@/contexts/shared/domain/Entity";
import { GroupalServiceId } from "./GroupalServiceId";

export class GroupalService extends Entity {
  constructor(readonly id: GroupalServiceId, readonly maxMembers: number) {
    super();
  }

  toPrimitives(): object {
    throw new Error("Method not implemented.");
    return {
      id: this.id.value,
      maxMembers: this.maxMembers,
    };
  }
}
