import { pgTable, uuid, varchar, date, timestamp } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";
import { usersTable } from "./user";

export const customersTable = pgTable("customers", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull()
    .unique(),
  dateOfBirth: date("date_of_birth").notNull().notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
