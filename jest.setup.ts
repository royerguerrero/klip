import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill for TextEncoder/TextDecoder (required for pg/drizzle-orm in Node.js test environment)
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as any;
}

// export const db = drizzle(env.TEST_DATABASE_URL, {
//   logger: env.NODE_ENV === "development",
// });

// export async function globalSetup() {
//   try {
//     await migrate(db, {
//       migrationsFolder:
//         "./src/contexts/shared/infrastructure/persistence/drizzle/migrations",
//     });
//     console.log("Test database migrations completed");
//   } catch (error) {
//     console.error("Error running migrations:", error);
//     throw error;
//   }
// }

// export async function globalTeardown() {}
