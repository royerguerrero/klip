export class SalesFrontCompanyDoesNotExits extends Error {
  constructor(subdomain: string) {
    super(
      `Sales front company does not exist in the specified subdomain: ${subdomain}`
    );
    this.name = "SalesFrontCompanyDoesNotExits";
  }
}
