import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { TeamId } from "./TeamId";

export class Team extends AggregateRoot {
  constructor(public id: TeamId, public name: string) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
    };
  }

  static fromPrimitives(primitives: ReturnType<Team["toPrimitives"]>): Team {
    return new Team(new TeamId(primitives.id), primitives.name);
  }
}
