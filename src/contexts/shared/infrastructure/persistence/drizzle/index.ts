import { drizzle } from "drizzle-orm/node-postgres";
import env from "@/contexts/shared/infrastructure/env";

export const db = drizzle(env.DATABASE_URL);
