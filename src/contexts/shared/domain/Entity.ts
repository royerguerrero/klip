export abstract class Entity {
  protected id: unknown;
  abstract toPrimitives(): object;
}
