import { ValueObject } from "@/contexts/shared/domain/ValueObject";

export class CustomerStatus implements ValueObject {
  static readonly ACTIVE = "active";
  static readonly ARCHIVED = "archived";

  constructor(public readonly value: string) {
    this.ensureValidStatus();
  }

  private ensureValidStatus(): void {
    if (this.value !== CustomerStatus.ACTIVE && this.value !== CustomerStatus.ARCHIVED) {
      throw new Error(`Invalid customer status: ${this.value}`);
    }
  }

  isActive(): boolean {
    return this.value === CustomerStatus.ACTIVE;
  }

  isArchived(): boolean {
    return this.value === CustomerStatus.ARCHIVED;
  }

  equals(other: CustomerStatus): boolean {
    return this.value === other.value;
  }

  notEquals(other: CustomerStatus): boolean {
    return !this.equals(other);
  }
} 