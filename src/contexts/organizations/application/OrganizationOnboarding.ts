import { Organization } from "@/contexts/organizations/domain/Organization";
import { OrganizationRepository } from "@/contexts/organizations/domain/OrganizationRepository";

export class OrganizationRegister {
  constructor(
    private readonly organizationRepository: OrganizationRepository
  ) {}

  async registrar(params: {
    id: string;
    name: string;
    logo: string | null;
    country: string;
    ownerId: string;
  }): Promise<{ error: Error | null; organization: Organization | null }> {
    const organization = await Organization.register(params);
    await this.organizationRepository.save(organization);

    return { error: null, organization };
  }
}
