import CardWrapper from "@/components/journal/entries-sum";
import { DataTable } from "@/components/journal/data-table";
import { getJournalEntries } from "@/actions/journal";
import { JournalEntry } from "@/types";
import { columns } from "@/components/journal/journalColumns";
import { auth } from "@/authConfig";
import { redirect } from "next/navigation";

async function getJournalData(): Promise<JournalEntry[]> {
  const data = await getJournalEntries();
  console.log("data", data);
  return data;
}

export default async function Home() {
  // Authentication
  const session = await auth();

  // If no session exists, redirect to login
  if (!session) {
    redirect("/");
  }

  const journalData = await getJournalEntries();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <CardWrapper />
      <DataTable columns={columns} data={journalData} />
    </div>
  );
}
