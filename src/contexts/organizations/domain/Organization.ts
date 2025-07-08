import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { OrganizationId } from "./OrganizationId";
import { Team } from "./Team";

export class Organization extends AggregateRoot {
  constructor(
    public id: OrganizationId,
    public name: string,
    public logo: string | null,
    public country: string,
    public teams: Team[]
  ) {
    super();
  }

  static async register(params: {
    id: string;
    name: string;
    logo: string | null;
    country: string;
  }) {
    return new Organization(
      new OrganizationId(params.id),
      params.name,
      params.logo,
      params.country,
      []
    );
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
