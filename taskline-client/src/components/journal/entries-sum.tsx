import { Lusitana } from "next/font/google";

export default async function CardWrapper() {
  const numberOfEntries = 5;
  const solvedEntries = 0;
  const numberOfUnsolved = numberOfEntries - solvedEntries;

  return (
    <>
      <Card title="Number of entries" value={numberOfEntries} type="entries" />
      <Card title="Solved entries" value={solvedEntries} type="solved" />
      <Card title="Unsolved entries" value={numberOfUnsolved} type="unsolved" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "entries" | "solved" | "unsolved";
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
