import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { SEOTable } from "./seo";

export const companiesTable = pgTable("companies", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  subdomain: varchar({ length: 63 }).unique().notNull(),
  banner: text().notNull(),
  avatar: text().notNull(),
  title: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 100 }),
  seoId: uuid("seo_id").references(() => SEOTable.id),
});
