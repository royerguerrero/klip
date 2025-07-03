import { defineConfig } from "drizzle-kit";
import env from "@/contexts/shared/infrastructure/env";

export default defineConfig({
  schema: [
    "./src/contexts/shared/infrastructure/persistence/drizzle/schemas/*",
  ],
  dialect: "postgresql",
  out: "./src/contexts/shared/infrastructure/persistence/drizzle/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
