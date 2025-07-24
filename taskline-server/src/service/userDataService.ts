import { db } from "../db";
import {
  businessTable,
  journalEntry,
  usersTable,
  locationTable,
  userLocationTable,
} from "../db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "./jwtService";

/**
 *
 * @param userId selector for locations
 * @returns list of locations {id: string, name: string}
 */
export async function getUserLocations(userId: any) {
  console.log("Here");

  if (!userId || typeof userId === "undefined") {
    return [];
  }
  // Fetch the user locations
  const locations = await db
    .select({
      id: locationTable.id,
      name: locationTable.name,
    })
    .from(locationTable)
    .innerJoin(userLocationTable, eq(userId, userLocationTable.userId));

  return locations;
}
