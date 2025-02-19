import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class SEOMetadataDescription extends ValueObject {
  constructor(public value: string) {
    super();
    this.ensureIsValidSEODescription(value);
  }

  private ensureIsValidSEODescription(value: string) {
    if (value.length === 0) {
      throw new Error("SEO description cannot be empty");
    }
    if (value.length > 160) {
      throw new Error("SEO description must be 160 characters or less");
    }
  }
}
