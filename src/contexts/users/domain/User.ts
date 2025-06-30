import { Entity } from "@/contexts/shared/domain/Entity";
import { UserId } from "./UserId";
import { Email } from "@/contexts/shared/domain/value-object/Email";

export class User extends Entity {
  constructor(
    public id: UserId,
    public firstName: string,
    public lastName: string,
    public email: Email,
    public password: string,
    public salt: string
  ) {
    super();
  }

  static fromPrimitives(primitives: ReturnType<User["toPrimitives"]>): User {
    return new User(
      new UserId(primitives.id),
      primitives.firstName,
      primitives.lastName,
      new Email(primitives.email),
      primitives.password,
      primitives.salt
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
    };
  }
}
