import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "./schema";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

/**
 * Main function to seed the database with test data.
 * It connects to the PostgreSQL database using the connection string
 * provided in the environment variable DB_URL and seeds it with the
 * data defined in the schema.
 */
async function main() {
  const pool = new Pool({ connectionString: process.env.DB_URL! });
  const db = drizzle(pool);
  await seed(db, schema);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
