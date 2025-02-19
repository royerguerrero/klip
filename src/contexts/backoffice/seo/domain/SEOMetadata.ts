import { SEOMetadataDescription } from "./SEOMetadataDescription";
import { SEOMetadataId } from "./SEOMetadataId";
import { SEOMetadataTitle } from "./SEOMetadataTitle";

export class SEOMetadata {
  constructor(
    readonly id: SEOMetadataId,
    readonly title: SEOMetadataTitle,
    readonly description: SEOMetadataDescription
  ) {}
}
