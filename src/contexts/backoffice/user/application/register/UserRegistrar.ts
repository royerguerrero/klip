import { Email } from "@/contexts/shared/domain/value-object/Email";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { Password } from "../../domain/Password";
import { User } from "../../domain/User";
import { PasswordHasher } from "../shared/PasswordHasher";
import { Company } from "../../domain/Company";

export class UserRegistrar {
  constructor(
    private repository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async registrar(params: {
    id: UserId;
    firstName: string;
    lastName: string;
    email: Email;
    password: Password;
    company: Company;
  }) {
    const user = new User(
      params.id,
      params.firstName,
      params.lastName,
      params.email,
      this.passwordHasher.hash(params.password),
      params.company
    );
    this.repository.save(user);

    return user;
  }
}
