import { Command } from "@/contexts/shared/application/Command";

export class CreateServiceCommand implements Command {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly detail: string
  ) {}
}
