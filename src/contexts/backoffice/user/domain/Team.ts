import { Entity } from "@/contexts/shared/domain/Entity";
import { TeamId } from "./TeamId";

export class Team extends Entity {
  constructor(readonly id: TeamId, readonly name: string) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
    };
  }

  static fromPrimitives(primitives: { id: string; name: string }): Team {
    return new Team(new TeamId(primitives.id), primitives.name);
  }
}
