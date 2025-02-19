import { Email } from "@/contexts/shared/domain/value-object/Email";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { InvalidCredentialsError } from "../../domain/InvalidCredentialsError";
import { PasswordHasher } from "../shared/PasswordHasher";
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
      throw new InvalidCredentialsError();
    }

    const passwordHashed = this.passwordHasher.hash(params.password);
    if (passwordHashed != user.password) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
