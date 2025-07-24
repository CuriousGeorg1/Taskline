// Controller for handling users

import { Router } from "express";
import {
  CreateUserRequest,
  CreateBusinessRequest,
  BusinessInfo,
} from "../types";
import { authenticated, hasSharedSecret } from "../middleware/authMiddleware";
import { createUser, userExists, createBusiness } from "../service/userService";

const userController = Router();

userController.post("/", hasSharedSecret, async (req, res) => {
  // TODO: Implement better validation later
  const createUserRequest = req.body as CreateUserRequest;
  const exists = await userExists(createUserRequest.email);
  if (exists) {
    res.status(200);
    return;
  }

  const createUserResponse = await createUser(createUserRequest);
  res.status(200).json(createUserResponse);
});

userController.post("/create-business", authenticated, async (req, res) => {
  // Get userId-property from token (authenticated)
  const userId: string = (req.user as any).sub;
  // Get information for business about to be created
  const businessInfo = req.body as BusinessInfo;
  console.log(businessInfo);

  // Assign elements to single variable
  const props = { userId, businessInfo };
  try {
    await createBusiness(props);
    res.status(201);
  } catch (error) {
    console.error();
    res.status(502).json({ error: "Failed to create business" });
  }
});

export default userController;
