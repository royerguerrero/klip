import {
  pgTable,
  uuid,
  varchar,
  date,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const identifyDocumentNumberEnum = pgEnum(
  "identify_document_type_enum",
  ["TI", "CC", "PP", "PPT"],
);

export type IdentifyDocumentType =
  (typeof identifyDocumentNumberEnum.enumValues)[number];

export const customersTable = pgTable("customers", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull()
    .unique(),
  dateOfBirth: date("date_of_birth").notNull().notNull(),
  identifyDocumentType: identifyDocumentNumberEnum("identify_document_type")
    .default("CC")
    .notNull(),
  identifyDocumentNumber: varchar("identify_document_number", {
    length: 100,
  }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
