import { Organization } from "./Organization";

export abstract class OrganizationRepository {
  abstract save(organization: Organization): Promise<void>;
}