import { RegisterRequest } from "../types";
import bcrypt from "bcrypt";
import { createUser, userExists } from "./userService";

export async function register(user: RegisterRequest) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const exists = await userExists(user.email);
  if (exists) {
    throw new Error("User already exists");
  }
  return await createUser({ ...user, password: hashedPassword });
}
