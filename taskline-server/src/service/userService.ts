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

export async function createBusiness(
  request: CreateBusinessRequest
): Promise<{ businessId: string; user: any }> {
  if (!request.businessInfo?.businessName?.trim() || !request.userId) {
    throw new Error("Invalid request for creating business");
  }

  /* Transaction for creating business. In the transaction both inserting the new business
  / to the database and updating users role to owner and assigning the user to the created business
  / must succeed 
  */
  try {
    return await db.transaction(async (tx) => {
      // create business
      const [business] = await tx
        .insert(businessTable)
        .values({ name: request.businessInfo.businessName })
        .returning();

      if (!business) {
        tx.rollback();
        throw new Error("Failed to create business");
      }

      // Update users' role and business
      const updatedUser = await tx
        .update(usersTable)
        .set({ role: "owner", businessId: business.id })
        .where(eq(usersTable.id, request.userId))
        .returning();

      if (updatedUser.length === 0) {
        tx.rollback();
        throw new Error("Failed to create business");
      }

      return { businessId: business.id, user: updatedUser[0] };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user[0];
}
