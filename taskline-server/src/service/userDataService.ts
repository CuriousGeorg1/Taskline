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

export async function getUserLocations(userId: any) {
  console.log("Here");
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
