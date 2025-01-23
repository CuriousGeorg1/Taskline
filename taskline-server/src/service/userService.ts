import { CreateUserRequest } from "../types";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createUser(user: CreateUserRequest) {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user.email));

  if (existingUser[0]) {
    return existingUser[0];
  }

  const newUser = await db.insert(usersTable).values(user);
  return newUser;
}
