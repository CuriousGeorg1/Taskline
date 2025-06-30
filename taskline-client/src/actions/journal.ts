"use server";

import apiClient, { serverClient } from "@/lib/apiClient";
import { JournalEntry } from "../types";
import { getApiToken } from "./auth";
import { redirect } from "next/navigation";

export async function createJournalEntry(entry: JournalEntry) {
  try {
    const res = await apiClient.post("/entries", entry);
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create journal entry");
  }
}

export async function getJournalEntries(
  sessionToken: string | undefined
): Promise<JournalEntry[]> {
  if (!sessionToken) {
    redirect("/errors/noSession");
  }
  try {
    const res = await apiClient.get("/journal", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get journal entries");
  }
}
