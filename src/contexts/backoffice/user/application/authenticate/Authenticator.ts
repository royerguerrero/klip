import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { PasswordHasher } from "../shared/PasswordHasher";
import { InvalidCredentials } from "../../domain/errors/InvalidCredentials";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { Password } from "../../domain/Password";

export class Authenticator {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async authenticate(params: {
    email: Email;
    password: Password;
  }): Promise<User> {
    const user = await this.userRepository.getByEmail(params.email);
    if (!user) {
      throw new InvalidCredentials();
    }

    if (!this.passwordHasher.compare(params.password, user.password)) {
      throw new InvalidCredentials();
    }

    return user;
  }
}
