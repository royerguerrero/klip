import {
  pgTable,
  timestamp,
  uuid,
  pgEnum,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { services } from "./services";

const paymentType = pgEnum("payment_type", ["full", "partial"]);

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  orderNumber: integer("order_number").notNull().unique(),
  customerId: uuid("customer_id").references(() => customers.id),
  paymentType: paymentType("payment_type").notNull(),
  discount: numeric("discount", { precision: 10, scale: 2 })
    .notNull()
    .default("0.00"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  orderId: uuid("order_id").references(() => orders.id),
  serviceId: uuid("service_id").references(() => services.id),
  // IDK if we need this
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  discount: numeric("discount", { precision: 10, scale: 2 })
    .notNull()
    .default("0.00"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
