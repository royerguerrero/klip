import { Entity } from "@/contexts/shared/domain/Entity";
import { TeamId } from "./TeamId";

export class Team extends Entity {
  constructor(readonly id: TeamId, readonly permissions: string[]) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      permissions: this.permissions,
    };
  }

  static fromPrimitives(primitives: {
    id: string;
    permissions: string[];
  }): Team {
    return new Team(new TeamId(primitives.id), primitives.permissions);
  }
}
