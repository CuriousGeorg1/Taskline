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
      return <div className="text-right font-medium w-fit">{date}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      const name = row.original.name;
      console.log("name", name);
      return <div className="text-left font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "journalEntry",
    header: () => <div className="text-left">Journal Entry</div>,
    cell: ({ row }) => {
      const entry = row.original.journalEntry;
      console.log("entry", entry);
      return (
        <div className="text-right font-medium text-ellipsis max-w-fit text-wrap">
          {entry}
        </div>
      );
    },
  },
  {
    accessorKey: "responsibleParty",
    header: () => <div className="text-left">Responsible Party</div>,
    cell: ({ row }) => {
      const party = row.original.responsibleParty;
      console.log("party", party);
      return <div className="text-left font-medium">{party}</div>;
    },
  },
];
