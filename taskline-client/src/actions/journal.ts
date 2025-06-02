"use server";

import apiClient, { serverClient } from "@/lib/apiClient";
import { JournalEntry } from "../types";
import { getApiToken } from "./auth";

export async function createJournalEntry(entry: JournalEntry) {
  try {
    const res = await serverClient.post("/entries", entry);
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create journal entry");
  }
}

export async function getJournalEntries() {
  try {
    const res = await serverClient.get("/journal");
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get journal entries");
  }
}
