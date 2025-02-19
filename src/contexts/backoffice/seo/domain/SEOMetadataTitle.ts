import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class SEOMetadataTitle extends ValueObject {
  constructor(public value: string) {
    super();
    this.ensureIsValidSEOTitle(value);
  }

  private ensureIsValidSEOTitle(value: string) {
    if (value.length === 0) {
      throw new Error("SEO description cannot be empty");
    }
    if (value.length > 60) {
      throw new Error("SEO title must be 60 characters or less");
    }
  }
}
