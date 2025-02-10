import { Router } from "express";
import {
  createJournalEntry,
  getJournalEntries,
} from "../service/journalService";

const journalController = Router();

journalController.post("/", async (req, res) => {
  try {
    const journalEntry = req.body;
    const createdEntry = await createJournalEntry(journalEntry);
    res.status(201).json(createdEntry);
  } catch (e: Error | any) {
    console.error("Error creating journal entry", e);
    res.status(400).json({ message: e?.message });
  }
});

journalController.get("/", async (req, res) => {
  try {
    const journalEntries = await getJournalEntries();
    res.status(200).json(journalEntries);
  } catch (e: Error | any) {
    console.error("Error getting journal entries", e);
    res.status(400).json({ message: e?.message });
  }
});

export default journalController;
