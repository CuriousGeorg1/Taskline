import { Router } from "express";
import { createUser } from "../service/authService";
import { CreateUserRequest } from "../types";

const authController = Router();

authController.post("/login", async (req, res) => {
  //
});

authController.post("/register", async (req, res) => {
  // Implement better validation later
  const user = req.body as CreateUserRequest;
  console.log(user);

  try {
    const newUser = await createUser(user);
    res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

export default authController;

