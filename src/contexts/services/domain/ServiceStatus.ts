import { ValueObject } from "@/contexts/shared/domain/ValueObject";

export class ServiceStatus implements ValueObject {
  static readonly DRAFT = "draft";
  static readonly PUBLISHED = "published";
  static readonly ARCHIVED = "archived";

  constructor(public readonly value: string) {
    this.ensureValidStatus();
  }

  private ensureValidStatus(): void {
    if (
      this.value !== ServiceStatus.DRAFT &&
      this.value !== ServiceStatus.PUBLISHED &&
      this.value !== ServiceStatus.ARCHIVED
    ) {
      throw new Error(`Invalid service status: ${this.value}`);
    }
  }

  isActive(): boolean {
    return this.value === ServiceStatus.PUBLISHED;
  }

  isArchived(): boolean {
    return this.value === ServiceStatus.ARCHIVED;
  }

  equals(other: ServiceStatus): boolean {
    return this.value === other.value;
  }

  notEquals(other: ServiceStatus): boolean {
    return !this.equals(other);
  }
}
