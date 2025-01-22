import express, { Express, Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import authController from "./controller/authController";
import { env, port } from "./config";
import userController from "./controller/userController";

const app: Express = express();

app.use(express.json());

// Log all requests in development mode
// Use the 'combined' format in production
app.use(morgan(env === "production" ? "combined" : "dev"));

// Bind controllers
app.use("/auth", authController);
app.use("/users", userController);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
