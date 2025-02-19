import { Email } from "@/contexts/shared/domain/value-object/Email";
import { User } from "./User";

export abstract class UserRepository {
  abstract getByEmail(email: Email): Promise<User | null>;
  abstract save(user: User): void;
}
