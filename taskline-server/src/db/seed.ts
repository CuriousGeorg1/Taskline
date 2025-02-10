import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "./schema";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config(); 

async function main() {
  const pool = new Pool({ connectionString: process.env.DB_URL! });
  const db = drizzle(pool);
  await seed(db, schema);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
