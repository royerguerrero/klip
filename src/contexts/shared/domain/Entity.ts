export abstract class Entity {
  public id: unknown;
  abstract toPrimitives(): object;
}
