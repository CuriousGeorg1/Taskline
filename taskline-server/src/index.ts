import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.EXPRESS_PORT || 4000;

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
