import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "dotenv/config";
import morgan from "morgan";
import authController from "./controller/authController";
dotenv.config();

const port = process.env.EXPRESS_PORT || 4000;
const env = process.env.NODE_ENV || "development";

const app: Express = express();

app.use(express.json());

// Log all requests in development mode
// Use the 'combined' format in production
app.use(morgan(env === 'production' ? 'combined' : 'dev'));

// Bind controllers
app.use("/auth", authController);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
