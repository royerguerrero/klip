import { ValueObject } from "@/contexts/shared/domain/ValueObject";

export class IdentityDocument implements ValueObject {
  constructor(readonly value: string, readonly type: string) {
    this.ensureIsValidIdentityDocument();
  }

  equals(identityDocument: IdentityDocument): boolean {
    return (
      this.value === identityDocument.value &&
      this.type === identityDocument.type
    );
  }

  notEquals(identityDocument: IdentityDocument): boolean {
    return !this.equals(identityDocument);
  }

  private ensureIsValidIdentityDocument(): void {
    if (!this.isValid()) {
      throw new Error("Invalid identity document");
    }
  }

  private isValid(): boolean {
    // Basic validation - ensure value is not empty and has reasonable length
    if (!this.value || this.value.trim().length === 0) {
      return false;
    }

    if (this.value.length < 3 || this.value.length > 50) {
      return false;
    }

    // Validate country code (2 letters)
    // Validate document type
    const validTypes = [
      "dni",
      "passport",
      "le",
      "lc",
      "ci",
      "rut",
      "cc",
      "ce",
      "ti",
      "cedula",
      "dui",
      "nie",
      "dpi",
      "ine",
      "curp",
      "ssn",
      "drivers_license",
      "state_id",
    ];

    if (!validTypes.includes(this.type)) {
      return false;
    }

    return true;
  }
}
