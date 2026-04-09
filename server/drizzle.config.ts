import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const DATABASE_URL =
  "postgresql://neondb_owner:npg_SVg8oDcY6ilv@ep-purple-base-ai6m9l4h-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export default defineConfig({
  schema: "./src/db/**/*.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
