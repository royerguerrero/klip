import { Company } from "../../../domain/Company";
import { CompanyId } from "../../../domain/CompanyId";
import { CompanyRepository } from "../../../domain/CompanyRepository";
import { companiesTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/companies";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { eq } from "drizzle-orm";

export class DrizzleCompanyRepository implements CompanyRepository {
  async getById(id: CompanyId): Promise<Company | null> {
    const query = await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.id, id.value));

    if (query.length === 0) {
      return null;
    }

    return Company.fromPrimitives({ id: query[0].id });
  }
}
