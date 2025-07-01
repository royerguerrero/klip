import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { UserRepository } from "../domain/UserRepository";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";
import { UserDoesNotExistError } from "../domain/errors/UserDoesNotExistError";
import { PasswordHasher } from "@/contexts/shared/domain/PasswordHasher";
import { User } from "../domain/User";

export class UserAuthenticator {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async authenticate(
    email: string,
    password: string
  ): Promise<{ error: Error | null; user: User | null }> {
    const criteria = new Criteria([new Filter("email", Operator.EQUAL, email)]);
    const results = await this.userRepository.matching(criteria);

    if (results.length != 1) {
      return { error: new UserDoesNotExistError(), user: null };
    }

    const user = results[0];
    await user.authenticate({
      password: password,
      passwordHasher: this.passwordHasher,
    });

    return { error: null, user };
  }
}
