import { Email } from "@/contexts/shared/domain/value-object/Email";
import { User } from "../../../domain/User";
import { UserRepository } from "../../../domain/UserRepository";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/user";

export class DrizzleUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await db.insert(usersTable).values({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      password: user.password,
      companyId: user.company.id.value,
    });
  }

  async getByEmail(email: Email): Promise<User | null> {
    const query = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.value));

    if (query.length === 0) {
      return null;
    }

    const user = query[0];
    return User.fromPrimitives({
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName || "",
      email: user.email || "",
      password: user.password || "",
      company: {
        id: user.companyId,
        teams: [],
      },
    });
  }
}
