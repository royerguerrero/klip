import { Email } from "@/contexts/shared/domain/value-object/Email";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { Password } from "../../domain/Password";
import { User } from "../../domain/User";
import { PasswordHasher } from "../shared/PasswordHasher";
import { Company } from "../../domain/Company";
import { CompanyFinder } from "./CompanyFinder";

export class UserRegistrar {
  constructor(
    private repository: UserRepository,
    private companyFinder: CompanyFinder,
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
    const company = await this.companyFinder.search(params.company.id);

    const user = User.create(
      params.id,
      params.firstName,
      params.lastName,
      params.email,
      this.passwordHasher.hash(params.password),
      new Company(company.id, [])
    );

    this.repository.save(user);

    return user;
  }
}
