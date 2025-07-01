import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { TeamId } from "./TeamId";

export class Team extends AggregateRoot {
  constructor(public id: TeamId, public name: string) {
    super();
  }

  toPrimitives() {
}
