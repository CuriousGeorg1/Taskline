import { Router } from "express";
import { CreateUserRequest } from "../types";
import { hasSharedSecret } from "../middleware/authMiddleware";
import { createUser, userExists } from "../service/userService";

const userController = Router();

userController.post("/", hasSharedSecret, async (req, res) => {
  // Implement better validation later
  const createUserRequest = req.body as CreateUserRequest;
  const exists = await userExists(createUserRequest.email);
  if (exists) {
    res.status(200);
    return;
  }

  const createUserResponse = await createUser(createUserRequest);
  res.status(200).json(createUserResponse);
});

export default userController;