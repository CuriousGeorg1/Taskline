import { drizzle as drizzleNeonHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { databaseUrl } from "../config";

let db: ReturnType<typeof drizzlePg> | ReturnType<typeof drizzleNeonHttp>;

if (process.env.NODE_ENV === "production") {
  // In production we use the neon http adapter to connect to the database
  // This allows for a more serverless friendly connection to the database
  db = drizzleNeonHttp(databaseUrl);
} else {
  // In development we use the node-postgres adapter to connect to the database
  const pool = new Pool({ connectionString: databaseUrl });
  db = drizzlePg(pool);
}

export { db };
