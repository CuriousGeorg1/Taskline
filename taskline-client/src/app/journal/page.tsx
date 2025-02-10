import CardWrapper from "@/components/journal/entries-sum";
import { DataTable } from "@/components/journal/data-table";
import { getJournalEntries } from "@/actions/journal";
import { JournalEntry } from "@/types";
import { columns } from "@/components/journal/journalColumns";

async function getJournalData(): Promise<JournalEntry[]> {
  return [await getJournalEntries()];
}

export default async function Home() {
  const journalData = await getJournalData();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CardWrapper />
      <DataTable columns={columns} data={journalData} />
    </div>
  );
}
