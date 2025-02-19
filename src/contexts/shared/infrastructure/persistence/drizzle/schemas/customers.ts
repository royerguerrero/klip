import { pgTable, uuid, varchar, date, timestamp } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";

export const customersTable = pgTable("customers", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull().notNull(),
  phoneNumber: varchar("phone_number", { length: 30 }).notNull(),
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
