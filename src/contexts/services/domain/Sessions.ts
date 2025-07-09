import { ValueObject } from "@/contexts/shared/domain/ValueObject";

export class Sessions implements ValueObject {
  constructor(readonly amount: number, readonly duration: number) {
    this.ensureIsValid();
  }

  equals(sessions: Sessions): boolean {
    return (
      this.amount === sessions.amount && this.duration === sessions.duration
    );
  }

  notEquals(sessions: Sessions): boolean {
    return !this.equals(sessions);
  }

  private ensureIsValid(): void {
    if (this.amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
  }
}
