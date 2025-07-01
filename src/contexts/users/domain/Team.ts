import { TeamId } from "@/contexts/organizations/domain/TeamId";
import { Entity } from "@/contexts/shared/domain/Entity";

export class Team extends Entity {
  constructor(
    public id: TeamId,
    public name: string,
    public permissions: string[]
  ) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      permissions: this.permissions,
    };
  }

  static fromPrimitives(primitives: ReturnType<Team["toPrimitives"]>): Team {
    return new Team(
      new TeamId(primitives.id),
      primitives.name,
      primitives.permissions
    );
  }
}
