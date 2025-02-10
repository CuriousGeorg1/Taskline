"use client";

import { ColumnDef } from "@tanstack/react-table";
import { getJournalEntries } from "@/actions/journal";
import { JournalEntry } from "@/types";

export const columns: ColumnDef<JournalEntry>[] = [
  {
    accessorKey: "Date",
    header: "date",
  },
  {
    accessorKey: "Documenter",
    header: "documenter",
  },
  {
    accessorKey: "Content",
    header: "content",
  },
  {
    accessorKey: "Actions",
    header: "actions",
  },
];
