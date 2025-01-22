import { db } from "../db";
import { usersTable } from "../db/schema";
import { RegisterRequest } from "../types";
import bcrypt from "bcrypt";

export async function register(user: RegisterRequest) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await db
    .insert(usersTable)
    .values({ ...user, password: hashedPassword, role: "user" });
  return newUser;
}
