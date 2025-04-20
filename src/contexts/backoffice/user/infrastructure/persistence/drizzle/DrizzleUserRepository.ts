import { Email } from "@/contexts/shared/domain/value-object/Email";
import { User } from "../../../domain/User";
import { UserRepository } from "../../../domain/UserRepository";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/user";
import {
  teamMembersTable,
  teamsTable,
} from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/team";

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

    const teams = await db
      .select()
      .from(teamMembersTable)
      .innerJoin(teamsTable, eq(teamMembersTable.teamId, teamsTable.id))
      .where(eq(teamMembersTable.userId, user.id));

    console.log("teams >>>>", teams);

    return User.fromPrimitives({
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName || "",
      email: user.email as string,
      password: user.password as string,
      company: {
        id: user.companyId,
        teams: teams.map((row) => ({
          id: row.team_members.teamId,
          name: row.teams.name,
          permissions: row.team_members.permissions,
        })),
      },
    });
  }
}
