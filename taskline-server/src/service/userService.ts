import { CreateUserRequest } from "../types";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function userExists(email: string) {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return !!existingUser[0];
}

export async function createUser(user: CreateUserRequest) {
  await db.insert(usersTable).values(user);
  const newUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user.email));
  return newUser[0];
}
