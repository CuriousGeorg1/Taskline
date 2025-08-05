// Controller for handling users

import { Router } from "express";
import {
  CreateUserRequest,
  CreateBusinessRequest,
  BusinessInfo,
} from "../types";
import { authenticated, hasSharedSecret } from "../middleware/authMiddleware";
import { createUser, userExists, createBusiness } from "../service/userService";
import { createToken } from "../service/jwtService";

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
  if ((req.user as any).role.equals("owner")) {
    return;
  }
  console.log("request: ", req);
  // Get userId from token
  const userId: string = (req.user as any).sub;
  // Get information for business about to be created
  const businessInfo = req.body as BusinessInfo;
  console.log("business info: ", businessInfo);

  // Assign elements to single variable
  const props = { userId, businessInfo };
  try {
    const response = await createBusiness(props);
    // Create new token to update users access
    const newToken = await createToken({
      id: response.user.id,
      email: response.user.email,
      role: response.user.role,
    });
    res.status(200).json(newToken);
  } catch (error) {
    console.error();
    res.status(502).json({ error: "Failed to create business" });
  }
});

export default userController;
