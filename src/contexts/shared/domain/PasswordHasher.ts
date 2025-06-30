import { Password } from "./value-object/Password";

export abstract class PasswordHasher {
  abstract hash(
    password: Password,
    salt: string
  ): Promise<{ hashedPassword: string; salt: string }>;
  abstract compare(
    password: Password,
    hashedPassword: string,
    salt: string
  ): Promise<boolean>;

  abstract generateSalt(): string;
}
