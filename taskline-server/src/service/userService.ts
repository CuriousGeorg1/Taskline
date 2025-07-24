import { CreateBusinessRequest, CreateUserRequest } from "../types";
import { db } from "../db";
import { usersTable, businessTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { PgUUID } from "drizzle-orm/pg-core";

export async function userExists(email: string) {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return !!existingUser[0];
}

export async function createUser(user: CreateUserRequest) {
  console.log("User when beginning to create:", user);
  const { id, ...userData } = user as any;

  if (userData.role === "owner") {
    // If the user is an owner, we need to create a business first
    const business = await db
      .insert(businessTable)
      .values({ name: userData.businessName })
      .returning();

    if (!business[0]) {
      throw new Error("Failed to create business for owner");
    }
    console.log("Business created:", business[0]);

    userData.businessId = business[0].id;
    delete userData.businessName; // Remove businessName from userData

    const [newUser] = await db.insert(usersTable).values(userData).returning();
    return newUser;
  }
  // Insert the user into the users table
  console.log("Creating (at register()) user:", userData);
  const [newUser] = await db.insert(usersTable).values(userData).returning();
  return newUser;
}

export async function createBusiness(request: CreateBusinessRequest) {
  await db.transaction(async (tx) => {
    const [business] = await tx
      .insert(businessTable)
      .values({ name: request.businessInfo.businessName })
      .returning();

    await tx
      .update(usersTable)
      .set({ role: "owner", businessId: business.id })
      .where(eq(usersTable.id, request.userId));
  });
}

export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user[0];
}
