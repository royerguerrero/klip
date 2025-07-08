import { OrganizationId } from "@/contexts/organizations/domain/OrganizationId";
import { Entity } from "@/contexts/shared/domain/Entity";
import { Team } from "./Team";

export class Organization extends Entity {
  constructor(
    public id: OrganizationId,
    public name: string,
    public logo: string,
    public country: string,
    public teams: Team[]
  ) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      logo: this.logo,
      country: this.country,
      teams: this.teams.map((team) => team.toPrimitives()),
    };
  }

  static fromPrimitives(
    primitives: ReturnType<Organization["toPrimitives"]>
  ): Organization {
    return new Organization(
      new OrganizationId(primitives.id),
      primitives.name,
      primitives.logo,
      primitives.country,
      primitives.teams.map((team) => Team.fromPrimitives(team))
    );
  }
}
