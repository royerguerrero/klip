import { CompanyId } from "@/contexts/backoffice/shared/domain/value-object/CompanyId";
import { CompanyRepository } from "../../domain/CompanyRepository";
import { Company } from "../../domain/Company";
import { CompanyDoesNotExits } from "../../domain/errors/CompanyDoesNotExists";

export class CompanyFinder {
  constructor(private repository: CompanyRepository) {}

  async search(id: CompanyId): Promise<Company> {
    const company = await this.repository.getById(id);
    if (!company) {
      throw new CompanyDoesNotExits(id.value);
    }

    return company;
  }
}
