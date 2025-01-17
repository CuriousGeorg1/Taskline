import CardWrapper from "@/components/journal/entries-sum";

export default async function Home() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CardWrapper />
    </div>
  );
}
