import { CreateUserRequest } from "../types";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createUser(user: CreateUserRequest) {
  // Check that a user with the email doenst already exist
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user.email));

  if (existingUser) {
    return existingUser;
  }

  const newUser = await db.insert(usersTable).values(user);
  return newUser;
}
