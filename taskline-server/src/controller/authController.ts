import { Router } from "express";
import { register, login } from "../service/authService";
import { GetTokenRequest, RegisterRequest } from "../types";
import { authenticated, hasSharedSecret } from "../middleware/authMiddleware";
import { createToken } from "../service/jwtService";

const authController = Router();

authController.post("/login", async (req, res) => {
  const user = req.body as RegisterRequest;

  try {
    const token = await login(user.email, user.password);
    console.log("Logged in user", user.email);
    res.status(200).json(token);
  } catch (e: Error | any) {
    console.error("Error logging in user", e);
    res.status(400).json({ message: e?.message });
  }
});

authController.post("/register", async (req, res) => {
  // Implement better validation later
  const user = req.body as RegisterRequest;

  try {
    const newUser = await register(user);
    console.log("Registered user", newUser.email);
    res.status(201).json(newUser);
  } catch (e: Error | any) {
    console.error("Error registering user", e);
    res.status(400).json({ message: e?.message });
  }
});

authController.post("/token", hasSharedSecret, async (req, res) => {
  // Implement better validation later
  const getTokenRequest = req.body as GetTokenRequest;
  const getTokenResponse = await createToken(getTokenRequest);
  res.status(200).json(getTokenResponse);
});

authController.post("/ping", authenticated, async (req, res) => {
  res.status(200).json({ message: "Pong" });
});

export default authController;
