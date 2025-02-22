import { Command } from "@/contexts/shared/application/Command";

export class RegisterCustomerCommand implements Command {
  constructor(
    readonly id: string
    readonly firstName: string,
    readonly lastName: string,
    readonly dob: string,
    readonly phoneNumber: string,
    readonly companyId: string,
  ) {}
}
