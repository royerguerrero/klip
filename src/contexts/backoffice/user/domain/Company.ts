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
      temas: this.teams.map((team) => ({
        id: team.id,
        name: team.name,
      })),
    };
  }

  static fromPrimitives(primitives: {
    id: string;
    teams: { id: string; name: string }[];
  }) {
    return new Company(
      new CompanyId(primitives.id),
      primitives.teams.map((team) => Team.fromPrimitives(team))
    );
  }
}
