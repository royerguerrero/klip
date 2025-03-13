import { Command } from "@/contexts/shared/application/Command";

export class CreateServiceCommand implements Command {
  constructor(
    readonly id: string,
    readonly fingerprint: string,
    readonly title: string,
    readonly description: string,
    readonly category: string,
    readonly subcategory: string | null,
    readonly duration: number,
  ) {}
}
