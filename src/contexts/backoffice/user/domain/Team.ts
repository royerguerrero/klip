import { Entity } from "@/contexts/shared/domain/Entity";
import { TeamId } from "./TeamId";

export class Team extends Entity {
  constructor(readonly id: TeamId, readonly name: string, readonly permissions: string[]) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      permissions: this.permissions,
    };
  }

  static fromPrimitives(primitives: {
    id: string;
    name: string;
    permissions: string[];
  }): Team {
    return new Team(new TeamId(primitives.id), primitives.name, primitives.permissions);
  }
}
