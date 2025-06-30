export class DifferentCurrenciesError extends Error {
  constructor(currency: string, otherCurrency: string) {
    super(
      `Cannot perform operation with different currencies: ${currency} and ${otherCurrency}`
    );
    this.name = "DifferentCurrenciesError";
  }
}
