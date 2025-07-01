export async function onboard(params: {
  id: string;
  name: string;
  logo: string | null;
  country: string;
  ownerId: string;
}) {
  const organization = await Organization.register(params);
  await this.organizationRepository.save(organization);
}