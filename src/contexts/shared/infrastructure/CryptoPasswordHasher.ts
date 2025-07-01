import { Password } from "@/contexts/shared/domain/value-object/Password";
import { PasswordHasher } from "@/contexts/shared/domain/PasswordHasher";
import crypto from "crypto";

export class CryptoPasswordHasher implements PasswordHasher {
  async hash(
    password: Password,
    salt: string
  ): Promise<{ hashedPassword: string; salt: string }> {
    return new Promise((resolve, reject) => {
      crypto.scrypt(password.value, salt, 64, (error, hash) => {
        if (error) reject(error);
        resolve({ hashedPassword: hash.toString("hex").normalize(), salt });
      });
    });
  }

  async compare(
    password: Password,
    hashedPassword: string,
    salt: string
  ): Promise<boolean> {
    const { hashedPassword: hash } = await this.hash(password, salt);
    return crypto.timingSafeEqual(
      Buffer.from(hashedPassword, "hex"),
      Buffer.from(hash, "hex")
    );
  }

  generateSalt(): string {
    return crypto.randomBytes(16).toString("hex");
  }
}
