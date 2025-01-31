import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "./schema";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, schema);
}
//main();
