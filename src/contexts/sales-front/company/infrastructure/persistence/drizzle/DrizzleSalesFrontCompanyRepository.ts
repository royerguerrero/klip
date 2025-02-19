import { SalesFrontCompany } from "../../../domain/SalesFrontCompany";
import { SalesFrontCompanyRepository } from "../../../domain/SalesFrontCompanyRepository";
import { SalesFrontCompanySubdomain } from "../../../domain/SalesFrontSubdomain";
import { companiesTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/companies";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { eq } from "drizzle-orm";
import { SEOTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/seo";
import { SEOMetadata } from "@/contexts/sales-front/shared/domain/SEOMetadata";
import {
  categoriesTable,
  servicesTable
} from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/services";
import { SalesFrontCompanyServiceCategory } from "../../../domain/SaleFrontCompanyServiceCategory";
import { SalesFrontCompanyService } from "../../../domain/SalesFrontCompanyService";

export class DrizzleSalesFrontCompanyRepository extends SalesFrontCompanyRepository {
  async getBySubdomain(
    subdomain: SalesFrontCompanySubdomain
  ): Promise<SalesFrontCompany | null> {
    const query = await db
      .select()
      .from(companiesTable)
      .leftJoin(SEOTable, eq(companiesTable.seoId, SEOTable.id))
      .innerJoin(servicesTable, eq(servicesTable.companyId, companiesTable.id))
      .where(eq(companiesTable.subdomain, subdomain.value));

    if (query.length === 0) {
      return null;
    }

    const { companies: company, seo } = query[0];

    const serviceCategoriesQuery = await db
      .select()
      .from(categoriesTable)
      .innerJoin(
        servicesTable,
        eq(servicesTable.categoryId, categoriesTable.id)
      )
      .where(eq(categoriesTable.companyId, company.id));

    const serviceCategories = serviceCategoriesQuery.reduce((acc, row) => {
      const { categories: category, services: service } = row;
      if (!acc[category.id]) {
        acc[category.id] = SalesFrontCompanyServiceCategory.fromPrimitives({
          fingerprint: category.fingerprint,
          title: category.title,
          services: [],
        });
      }

      acc[category.id].services.push(
        SalesFrontCompanyService.fromPrimitives({
          fingerprint: service.fingerprint,
          title: service.title,
          description: service.description,
          subCategory: service.subCategory ?? "",
        })
      );

      return acc;
    }, {} as Record<string, SalesFrontCompanyServiceCategory>);

    return SalesFrontCompany.fromPrimitives({
      subdomain: company.subdomain,
      seo: SEOMetadata.fromPrimitives({
        title: seo?.title || "",
        description: seo?.description || "",
      }),
      banner: company.banner,
      avatar: company.avatar,
      title: company.title,
      description: company.description || "",
      serviceCategories: Object.values(serviceCategories),
    });
  }
}
