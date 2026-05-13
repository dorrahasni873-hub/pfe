import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as relations from "./relations";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const sql = neon(DATABASE_URL);
const db = drizzle({ client: sql, schema: { ...schema, ...relations } });

export default db;
