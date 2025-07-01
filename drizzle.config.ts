import { defineConfig } from "drizzle-kit";
import env from "@/contexts/shared/infrastructure/env";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/contexts/shared/infrastructure/persistence/drizzle/schemas/*",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
