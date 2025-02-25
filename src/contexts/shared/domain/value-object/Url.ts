import { ValueObject } from "./ValueObject";

export class URL implements ValueObject {
  constructor(readonly value: string) {
    this.ensureIsValidURL();
  }

  private ensureIsValidURL() {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlRegex.test(this.value)) {
      throw new Error(`The URL (${this.value}) is not valid`);
    }
  }
}
