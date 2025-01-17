import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "dotenv/config";
import bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/node-postgres";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

dotenv.config();

const app: Express = express();
const port = process.env.EXPRESS_PORT || 4000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
    // if (!process.env.JWT_SECRET) {
    //   throw new Error("JWT_SECRET is not defined");
    // }
    // const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET);
    // await client.query("COMMIT");
    // res.json({ token });
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

let counter = 0;

app.get("/counter", (req: Request, res: Response) => {
  counter++;
  res.send(`Counter: ${counter}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
