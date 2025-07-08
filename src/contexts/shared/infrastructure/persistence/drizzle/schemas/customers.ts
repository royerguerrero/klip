import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { teams } from "./organization";
import { pgEnum } from "drizzle-orm/pg-core";
import { date } from "drizzle-orm/pg-core";

export const identityDocumentTypes = pgEnum("identity_document_types", [
  "dni",
  "passport",
  "le",
  "lc",
  "ci",
  "rut",
  "cc",
  "ce",
  "ti",
  "cedula",
  "dui",
  "nie",
  "dpi",
  "ine",
  "curp",
  "ssn",
  "drivers_license",
  "state_id",
]);

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  identityDocument: varchar("identity_document", { length: 255 }).notNull(),
  identityDocumentType: identityDocumentTypes(
    "identity_document_type"
  ).notNull(),
  dob: date("date_of_birth").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  archived: boolean("archived").notNull().default(false),
  teamId: uuid("team_id")
    .references(() => teams.id)
    .notNull(),
  addedAt: timestamp("added_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type NewCustomer = typeof customers.$inferInsert;