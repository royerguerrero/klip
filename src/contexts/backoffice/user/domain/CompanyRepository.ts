import { CompanyId } from "../../shared/domain/value-object/CompanyId";
import { Company } from "./Company";

export abstract class CompanyRepository {
  abstract getById(id: CompanyId): Promise<Company | null>;
}
