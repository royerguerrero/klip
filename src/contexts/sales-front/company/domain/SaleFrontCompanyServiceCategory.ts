import { Entity } from "@/contexts/shared/domain/Entity";
import { SalesFrontCompanyService } from "./SalesFrontCompanyService";

export class SalesFrontCompanyServiceCategory extends Entity {
  constructor(
    readonly fingerprint: string,
    readonly title: string,
    readonly services: SalesFrontCompanyService[]
  ) {
    super();
  }

  toPrimitives() {
    return {
      fingerprint: this.fingerprint,
      title: this.title,
      services: this.services.map((service) => service.toPrimitives()),
    };
  }

  static fromPrimitives(primitives: {
    fingerprint: string;
    title: string;
    services: {
      fingerprint: string;
      title: string;
      description: string;
      subCategory: string;
    }[];
  }): SalesFrontCompanyServiceCategory {
    const services = primitives.services.map((service) =>
      SalesFrontCompanyService.fromPrimitives(service)
    );
    return new SalesFrontCompanyServiceCategory(
      primitives.fingerprint,
      primitives.title,
      services
    );
  }
}
