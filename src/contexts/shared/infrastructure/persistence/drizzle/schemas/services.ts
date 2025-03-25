import { pgTable, varchar, text, uuid, integer } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";
import { sql } from "drizzle-orm";

export const categoriesTable = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  fingerprint: varchar({ length: 80 }).notNull(),
  title: varchar({ length: 80 }).notNull(),
  subCategories: text("sub_categories")
    .array()
    .default(sql`ARRAY[]::text[]`),
  companyId: uuid("company_id")
    .references(() => companiesTable.id)
    .notNull(),
});

export const servicesTable = pgTable("services", {
  id: uuid().primaryKey().defaultRandom(),
  fingerprint: varchar({ length: 80 }).notNull(),
  title: varchar({ length: 120 }).notNull(),
  description: varchar({ length: 180 }).notNull(),
  categoryId: uuid("category_id")
    .references(() => categoriesTable.id)
    .notNull(),
  subCategory: varchar("sub_category", { length: 100 }),
  duration: integer().default(0).notNull(),
  companyId: uuid("company_id")
    .references(() => companiesTable.id)
    .notNull(),
});

export const serviceDetails = pgTable("service_details", {
  id: uuid().primaryKey().defaultRandom(),
  maxParticipants: integer("max_participants"),
  service: uuid().references(() => servicesTable.id),
});
