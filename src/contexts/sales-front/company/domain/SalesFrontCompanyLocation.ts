import { Entity } from "@/contexts/shared/domain/Entity";

export class SalesFrontCompanyLocation extends Entity {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly isDefault: boolean
  ) {
    super();
  }

  toPrimitives() {
    return {
      title: this.title,
      description: this.description,
      isDefault: this.isDefault,
    };
  }

  static fromPrimitives(primitives: {
    title: string;
    description: string;
    isDefault: boolean;
  }): SalesFrontCompanyLocation {
    return new SalesFrontCompanyLocation(
      primitives.title,
      primitives.description,
      primitives.isDefault
    );
  }
}
