import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { UserId } from "./UserId";
import { PasswordHasher } from "@/contexts/shared/domain/PasswordHasher";
import { Password } from "@/contexts/shared/domain/value-object/Password";
import { InvalidPasswordError } from "@/contexts/shared/domain/errors/InvalidPasswordError";
import { Organization } from "./Organization";

export class User extends AggregateRoot {
  constructor(
    readonly id: UserId,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: Email,
    readonly password: string,
    readonly salt: string,
    readonly organization?: Organization
  ) {
    super();
  }

  static async register(
    params: Omit<
      ReturnType<User["toPrimitives"]>,
      "salt" | "teams" | "organizationId"
    > & {
      passwordHasher: PasswordHasher;
    }
  ) {
    const { hashedPassword, salt } = await params.passwordHasher.hash(
      new Password(params.password),
      params.passwordHasher.generateSalt()
    );

    return new User(
      new UserId(params.id),
      params.firstName,
      params.lastName,
      new Email(params.email),
      hashedPassword,
      salt
    );
  }

  async authenticate(params: {
    password: string;
    passwordHasher: PasswordHasher;
  }) {
    const passwordMatch = await params.passwordHasher.compare(
      new Password(params.password),
      this.password,
      this.salt
    );

    if (!passwordMatch) {
      throw new InvalidPasswordError();
    }
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.value,
      password: this.password,
      salt: this.salt,
      organization: this.organization?.toPrimitives(),
    };
  }

  static fromPrimitives(primitives: ReturnType<User["toPrimitives"]>): User {
    return new User(
      new UserId(primitives.id),
      primitives.firstName,
      primitives.lastName,
      new Email(primitives.email),
      primitives.password,
      primitives.salt,
      primitives.organization
        ? Organization.fromPrimitives(primitives.organization)
        : undefined
    );
  }
}
