import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const SEOTable = pgTable("seo", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 60 }),
  description: varchar({ length: 160 }),
});
