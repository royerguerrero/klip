import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar({ length: 255 }).unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).unique(),
  password: varchar({ length: 255 }),
  emailValidated: timestamp("email_validated"),
  whatsappValidated: timestamp("whatsapp_validated"),
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
