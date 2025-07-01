import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { Email } from "@/contexts/shared/domain/value-object/Email";
import { UserId } from "./UserId";
import { OrganizationId } from "@/contexts/organizations/domain/OrganizationId";
import { Team } from "@/contexts/users/domain/Team";
import { PasswordHasher } from "@/contexts/shared/domain/PasswordHasher";
import { Password } from "@/contexts/shared/domain/value-object/Password";
import { InvalidPasswordError } from "@/contexts/shared/domain/errors/InvalidPasswordError";

export class User extends AggregateRoot {
  constructor(
    public id: UserId,
    public firstName: string,
    public lastName: string,
    public email: Email,
    public password: string,
    public salt: string,
    public teams?: Team[],
    public organizationId?: OrganizationId
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
      salt,
      []
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

  static fromPrimitives(primitives: ReturnType<User["toPrimitives"]>): User {
    return new User(
      new UserId(primitives.id),
      primitives.firstName,
      primitives.lastName,
      new Email(primitives.email),
      primitives.password,
      primitives.salt,
      primitives.teams,
      primitives.organizationId
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.value,
      password: this.password,
      salt: this.salt,
      organizationId: this.organizationId,
      teams: this.teams,
    };
  }
}
