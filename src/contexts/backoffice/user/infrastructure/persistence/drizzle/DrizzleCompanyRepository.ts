import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";
import { Company } from "../../../domain/Company";
import { CompanyRepository } from "../../../domain/CompanyRepository";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { companiesTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/companies";
import { eq } from "drizzle-orm";

export class DrizzleCompanyRepository extends CompanyRepository {
  async getById(id: CompanyId): Promise<Company | null> {
    const query = await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.id, id.value));

    if (query.length === 0) {
      return null;
    }

    const company = query[0];

    return Company.fromPrimitives({
      id: company.id,
      teams: [],
    });
  }
}
