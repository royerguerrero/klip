import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { teams } from "./organization";
import { pgEnum } from "drizzle-orm/pg-core";
import { date } from "drizzle-orm/pg-core";

export const identityDocumentTypes = pgEnum("identity_document_types", [
  "dni",
  "passport",
  "le",
  "lc",
]);

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }),
  identityDocument: varchar("identity_document", { length: 255 }),
  identityDocumentType: identityDocumentTypes("identity_document_type"),
  dob: date("date_of_birth").notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  teamId: uuid("team_id").references(() => teams.id),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
