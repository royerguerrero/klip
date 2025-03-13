import { pgTable, pgEnum, uuid, text, varchar } from "drizzle-orm/pg-core";

export const countryEnum = pgEnum("countries", ["CO"]);

export const addressesTable = pgTable("addresses", {
  id: uuid().primaryKey().defaultRandom(),
  addressLines: text(),
  locality: varchar({ length: 100 }),
  administrativeArea: varchar({ length: 100 }),
  postalCode: varchar({ length: 100 }),

  country: countryEnum(),
});
