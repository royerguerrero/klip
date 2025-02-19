import { Password } from "../../domain/Password";

export abstract class PasswordHasher {
  abstract hash(password: Password): string;
}
