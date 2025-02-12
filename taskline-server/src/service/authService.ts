import { RegisterRequest } from "../types";
import bcrypt from "bcrypt";
import { createUser, userExists, getUserByEmail } from "./userService";
import { createToken } from "./jwtService";

export async function register(user: RegisterRequest) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const exists = await userExists(user.email);
  if (!exists == null) {
    throw new Error("User already exists");
  }
  return await createUser({ ...user, password: hashedPassword });
}

export async function login(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (user == null) {
    throw new Error("User not found");
  }
  if (user.password === null) {
    throw new Error("User password is null");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid password");
  }

  const { apiToken, expiresIn } = await createToken({
    id: user.id.toString(),
    email: user.email,
    role: user.role,
  });

  return { ...user, apiToken, expiresIn };
}
