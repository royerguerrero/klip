import { Command } from "@/contexts/shared/application/Command";

export class RegisterUserCommand implements Command {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly company: {
      id: string;
      teams: {
        id: string;
        permissions: string[];
      }[];
    }
  ) {}
}
