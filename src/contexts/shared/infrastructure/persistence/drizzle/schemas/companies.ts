import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { SEOTable } from "./seo";
import { addressesTable } from "./address";

export const companiesTable = pgTable("companies", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  subdomain: varchar({ length: 63 }).unique().notNull(),
  banner: text().notNull(),
  avatar: text().notNull(),
  title: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 100 }),
  seoId: uuid("seo_id").references(() => SEOTable.id),
});

export const locationsTable = pgTable("locations", {
  id: uuid().primaryKey().defaultRandom(),
  addressId: uuid("address_id").references(() => addressesTable.id),
  companyId: uuid("company_id")
    .references(() => companiesTable.id)
    .notNull(),
});
