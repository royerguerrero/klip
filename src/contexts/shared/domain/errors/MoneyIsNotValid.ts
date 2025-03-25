export class MoneyIsNotValid extends Error {
  constructor(amount: number, currency: string) {
    super(
      `The money value is not valid (amount: ${amount}, currency: ${currency})`,
    );
    this.name = "MoneyIsNotValid";
  }
}
