export class CompanyDoesNotExits extends Error {
  constructor(subdomain: string) {
    super(`Company does not exist in the specified subdomain: ${subdomain}`);
    this.name = "CompanyDoesNotExits";
  }
}
