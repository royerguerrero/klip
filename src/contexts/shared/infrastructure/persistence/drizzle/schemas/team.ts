import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";
import { usersTable } from "./user";

export const teamsTable = pgTable("teams", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 120 }).notNull(),
  companyId: uuid("company_id")
    .references(() => companiesTable.id)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const teamMembersTable = pgTable("team_members", {
  id: uuid().primaryKey().defaultRandom(),
  team: uuid()
    .references(() => teamsTable.id)
    .notNull(),
  user: uuid()
    .references(() => usersTable.id)
    .notNull(),
  permissions: text("permissions").array().notNull().default([]),
  addedAt: timestamp("added_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
