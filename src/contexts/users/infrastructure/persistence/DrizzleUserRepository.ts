import { UserRepository } from "@/contexts/users/domain/UserRepository";
import { User } from "@/contexts/users/domain/User";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { DrizzleCriteriaConverter } from "@/contexts/shared/infrastructure/persistence/drizzle/DrizzleCriteriaConverter";
import { users } from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/users";
import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { eq, sql } from "drizzle-orm";
import {
  organizations,
  teamMembers,
  teams,
} from "@/contexts/shared/infrastructure/persistence/drizzle/schemas/organization";

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
    const query = await db
      .select()
      .from(users)
      .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
      .leftJoin(teams, eq(teamMembers.teamId, teams.id))
      .leftJoin(organizations, eq(teams.organizationId, organizations.id))
      .where(sql`${filters}`);

    const results = new Map<string, User>();
    query.forEach(({ users, team_members, teams, organizations }) => {
      const user = results.get(users.id);
      if (!user) {
        results.set(
          users.id,
          User.fromPrimitives({
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            password: users.password,
            salt: users.salt,
            organization: organizations
              ? {
                  id: organizations.id,
                  name: organizations.name,
                  logo: "",
                  country: organizations.country,
                  teams: teams
                    ? [
                        {
                          id: teams.id,
                          name: teams.name ?? "",
                          permissions: team_members?.permissions ?? [],
                        },
                      ]
                    : [],
                }
              : undefined,
          })
        );
      } else {
        const updatedUser = User.fromPrimitives({
          ...user.toPrimitives(),
          organization: user.organization && {
            ...user.organization.toPrimitives(),
            teams: [
              ...(user.organization?.teams.map((team) => team.toPrimitives()) ??
                []),
              {
                id: teams?.id ?? "",
                name: teams?.name ?? "",
                permissions: team_members?.permissions ?? [],
              },
            ],
          },
        });
        results.set(users.id, updatedUser);
      }
    });

    return Array.from(results.values());
  }
}
