import CardWrapper from "@/components/journal/entries-sum";
import { DataTable } from "@/components/journal/data-table";
import { getJournalEntries } from "@/actions/journal";
import { JournalEntry } from "@/types";
import { columns } from "@/components/journal/journalColumns";

async function getJournalData(): Promise<JournalEntry[]> {
  const data = await getJournalEntries();
  console.log("data", data);
  return data;
}

export default async function Home() {
  const journalData = await getJournalData();
  return (
    <div>
      <CardWrapper />
      <DataTable columns={columns} data={journalData} />
    </div>
  );
}
