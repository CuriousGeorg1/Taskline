// taskline-server/src/services/journalService.ts

import { db } from "../db";
import { journalEntry } from "../db/schema";

export async function createJournalEntry(entryData: any) {
  const newEntry = await db.insert(journalEntry).values(entryData).returning();
  return newEntry;
}

export async function getJournalEntries() {
  const entries = await db.select().from(journalEntry).execute();
  return entries;
}
