// taskline-server/src/services/journalService.ts

import { date } from "drizzle-orm/mysql-core";
import { db } from "../db";
import {
  businessTable,
  journalEntry,
  usersTable,
  locationTable,
} from "../db/schema";
import { eq } from "drizzle-orm";

export async function createJournalEntry(entryData: any) {
  const newEntry = await db.insert(journalEntry).values(entryData).returning();
  return newEntry;
}

// TODO: check logic for query when frontend works
export async function getJournalEntries() {
  const entries = await db
    .select({
      name: usersTable.name,
      date: journalEntry.date,
      journalEntry: journalEntry.journalEntry,
      responsibleParty: journalEntry.responsibleParty,
    })
    .from(journalEntry)
    .innerJoin(usersTable, eq(journalEntry.userId, usersTable.id))
    .execute();
  return entries;
}
