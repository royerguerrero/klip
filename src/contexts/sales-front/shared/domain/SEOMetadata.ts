import { Entity } from "@/contexts/shared/domain/Entity";

export class SEOMetadata extends Entity {
  constructor(readonly title: string, readonly description: string) {
    super();
  }

  toPrimitives() {
    return {
      title: this.title,
      description: this.description,
    };
  }

  static fromPrimitives(primitives: { title: string; description: string }) {
    return new SEOMetadata(primitives.title, primitives.description);
  }
}
