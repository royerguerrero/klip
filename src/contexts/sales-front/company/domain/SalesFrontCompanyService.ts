import { Entity } from "@/contexts/shared/domain/Entity";

export class SalesFrontCompanyService extends Entity {
  constructor(
    readonly fingerprint: string,
    readonly title: string,
    readonly description: string,
    readonly subCategory: string
  ) {
    super();
  }

  toPrimitives() {
    return {
      fingerprint: this.fingerprint,
      title: this.title,
      description: this.description,
      subCategory: this.subCategory,
    };
  }

  static fromPrimitives(primitives: {
    fingerprint: string;
    title: string;
    description: string;
    subCategory: string;
  }): SalesFrontCompanyService {
    return new SalesFrontCompanyService(
      primitives.fingerprint,
      primitives.title,
      primitives.description,
      primitives.subCategory
    );
  }
}
