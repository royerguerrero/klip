import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { SalesFrontCompanySubdomain } from "./SalesFrontSubdomain";
import { SalesFrontCompanyServiceCategory } from "./SaleFrontCompanyServiceCategory";
import { SEOMetadata } from "../../shared/domain/SEOMetadata";

export class SalesFrontCompany extends AggregateRoot {
  constructor(
    readonly subdomain: SalesFrontCompanySubdomain,
    readonly seo: SEOMetadata,
    readonly banner: string,
    readonly avatar: string,
    readonly title: string,
    readonly description: string,
    readonly serviceCategories: SalesFrontCompanyServiceCategory[]
  ) {
    super();
  }

  toPrimitives() {
    return {
      subdomain: this.subdomain.value,
      seo: this.seo.toPrimitives(),
      banner: this.banner,
      avatar: this.avatar,
      title: this.title,
      description: this.description,
      serviceCategories: this.serviceCategories.map((category) =>
        category.toPrimitives()
      ),
    };
  }

  static fromPrimitives(primitives: {
    subdomain: string;
    seo: ReturnType<typeof SEOMetadata.fromPrimitives>;
    banner: string;
    avatar: string;
    title: string;
    description: string;
    serviceCategories: ReturnType<
      typeof SalesFrontCompanyServiceCategory.fromPrimitives
    >[];
  }): SalesFrontCompany {
    return new SalesFrontCompany(
      new SalesFrontCompanySubdomain(primitives.subdomain),
      SEOMetadata.fromPrimitives(primitives.seo),
      primitives.banner,
      primitives.avatar,
      primitives.title,
      primitives.description,
      primitives.serviceCategories.map((category) =>
        SalesFrontCompanyServiceCategory.fromPrimitives(category)
      )
    );
  }
}
