import dotenv from "dotenv";
dotenv.config();

const port = process.env.EXPRESS_PORT || 4000;
const env = process.env.NODE_ENV || "development";

const sharedSecret = process.env.SHARED_SECRET as string;
if (!sharedSecret) {
  throw new Error("Missing SHARED_SECRET environment variable");
}

const databaseUrl = process.env.DB_URL as string;
if (!databaseUrl) {
  throw new Error("Missing DB_URL environment variable");
}

export { port, env, sharedSecret, databaseUrl };
