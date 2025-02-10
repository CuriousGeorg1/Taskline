"use client";

import { ColumnDef } from "@tanstack/react-table";
import { getJournalEntries } from "@/actions/journal";
import { JournalEntry } from "@/types";

export const columns: ColumnDef<JournalEntry>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      console.log("row", row);
      const date: String = row.getValue("date");
      console.log("date", date);
      //   const formatted = new Intl.DateTimeFormat("en-GB", {}).format(date);
      //   console.log("formatted", formatted);
      return <div className="text-right font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "userId",
    header: "Documenter",
  },
  {
    accessorKey: "journalEntry",
    header: () => <div className="text-left">Journal Entry</div>,
    cell: ({ row }) => {
      const entry = row.original.journalEntry;
      console.log("entry", entry);
      return <div className="text-left font-medium">{entry}</div>;
    },
  },
  {
    accessorKey: "responsibleParty",
    header: "Responsible Party",
  },
];
