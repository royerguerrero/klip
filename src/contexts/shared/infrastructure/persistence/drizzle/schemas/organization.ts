import { pgEnum } from "drizzle-orm/pg-core";
import { pgTable, timestamp, uuid, varchar, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";

export const countries = pgEnum("countries", [
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "EC",
  "PE",
  "UY",
  "VE",
]);

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  country: countries("country").notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }),
  organizationId: uuid("organization_id").references(() => organizations.id),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  teamId: uuid("team_id")
    .references(() => teams.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  permissions: text("permissions")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
