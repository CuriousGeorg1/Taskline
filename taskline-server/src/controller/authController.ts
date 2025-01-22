import { Router } from "express";
import { register } from "../service/authService";
import { GetTokenRequest, RegisterRequest } from "../types";
import { authenticated, hasSharedSecret } from "../middleware/authMiddleware";
import { createToken } from "../service/jwtService";

const authController = Router();

authController.post("/login", async (req, res) => {
  //
});

authController.post("/register", async (req, res) => {
  // Implement better validation later
  const user = req.body as RegisterRequest;
  console.log(user);

  try {
    const newUser = await register(user);
    res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
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
