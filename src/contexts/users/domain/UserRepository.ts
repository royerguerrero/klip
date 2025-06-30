import { User } from "./User";

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract matching(email: string): Promise<User | null>;
}
