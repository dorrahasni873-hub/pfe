import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { databaseConfig } from "../config";
import * as schema from "./schema";
import * as relations from "./relations";

const sql = neon(databaseConfig.url);
const db = drizzle({ client: sql, schema: { ...schema, ...relations } });

export default db;
