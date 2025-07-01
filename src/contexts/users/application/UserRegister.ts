import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserAlreadyExistsError } from "../domain/errors/UserAlreadyExits";
import { PasswordHasher } from "@/contexts/shared/domain/PasswordHasher";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";

export class UserRegister {
  constructor(
    private readonly repository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async register(
    params: Omit<
      ReturnType<User["toPrimitives"]>,
      "salt" | "organization"
    >
  ): Promise<{ error: Error | null; user: User | null }> {
    const criteria = new Criteria([
      new Filter("email", Operator.EQUAL, params.email),
    ]);
    const existingUser = await this.repository.matching(criteria);

    if (existingUser.length > 0) {
      return { error: new UserAlreadyExistsError(), user: null };
    }

    const user = await User.register({
      id: params.id,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      password: params.password,
      passwordHasher: this.passwordHasher,
      organization: undefined,
    });

    await this.repository.save(user);

    return { error: null, user };
  }
}
