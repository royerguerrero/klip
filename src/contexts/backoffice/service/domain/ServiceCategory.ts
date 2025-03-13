import { Entity } from "@/contexts/shared/domain/Entity";

export class ServiceCategory extends Entity {
  constructor() {
    super();
  }

  toPrimitives(): object {
    throw new Error("Method not implemented.");
  }
}
