import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required. Set it in your .env file.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/db/schemas/auth.ts",
  out: "drizzle",
  dbCredentials: {
    url: databaseUrl,
  },
});
