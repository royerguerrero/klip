import { Entity } from "@/contexts/shared/domain/Entity";
import { Team } from "./Team";
import { CompanyId } from "../../shared/domain/value-object/CompanyId";

export class Company extends Entity {
  constructor(readonly id: CompanyId, readonly teams: Team[]) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      teams: this.teams.map((team) => ({
        id: team.id,
        permissions: team.permissions,
      })),
    };
  }

  static fromPrimitives(primitives: {
    id: string;
    teams: { id: string; name: string; permissions: string[] }[];
  }) {
    return new Company(
      new CompanyId(primitives.id),
      primitives.teams.map((team) => Team.fromPrimitives(team))
    );
  }
}
