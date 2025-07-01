import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { User } from "@/contexts/users/domain/User";

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract matching(criteria: Criteria): Promise<User[]>;
}
