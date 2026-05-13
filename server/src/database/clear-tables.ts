import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function dropTables() {
  try {
    await sql`DROP TABLE IF EXISTS maintenance`;
    await sql`DROP TABLE IF EXISTS entretien`;
    await sql`DROP TABLE IF EXISTS panne`;

    console.log("Tables dropped successfully");
  } catch (err) {
    console.error("Error dropping tables:", err);
    process.exit(1);
  }
}

dropTables();
