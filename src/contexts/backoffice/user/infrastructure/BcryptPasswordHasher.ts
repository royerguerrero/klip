import bcrypt from "bcrypt";
import { Password } from "../domain/Password";
import { PasswordHasher } from "../application/shared/PasswordHasher";

export class BcryptPasswordHasher extends PasswordHasher {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    super();
    this.saltRounds = saltRounds;
  }

  hash(password: Password): string {
    return bcrypt.hashSync(password.value, this.saltRounds);
  }

  compare(password: Password, passwordHashed: string): boolean {
    return bcrypt.compareSync(password.value, passwordHashed);
  }
}
