import { UserRepository } from "@/contexts/users/domain/UserRepository";
import { User } from "@/contexts/users/domain/User";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/persistence/drizzle/DrizzleCriteriaConverter";
import { users } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/users";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { sql } from "drizzle-orm";

export class DrizzleUserRepository implements UserRepository {
  private dataMapper = {
    id: users.id,
    firstName: users.firstName,
    lastName: users.lastName,
    email: users.email,
    password: users.password,
    salt: users.salt,
  };
  private criteriaConverter = new DrizzleCriteriaConverter(this.dataMapper);

  async save(user: User): Promise<void> {
    await db.insert(users).values(user.toPrimitives());
  }

  async matching(criteria: Criteria): Promise<User[]> {
    const filters = this.criteriaConverter.convert(criteria);
    const result = await db
      .select()
      .from(users)
      .where(sql`${filters}`);

    return result.map((user) =>
      User.fromPrimitives({
        id: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: user.password || "",
        salt: user.salt || "",
      })
    );
  }
}
