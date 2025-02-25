import { Repository } from "@/contexts/shared/domain/Repository";
import { Company } from "./Company";
import { CompanyId } from "./CompanyId";

export abstract class CompanyRepository extends Repository {
  abstract getById(id: CompanyId): Promise<Company | null>;
}
