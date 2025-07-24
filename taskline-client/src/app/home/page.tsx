import { auth } from "@/authConfig";
import { redirect } from "next/navigation";
import { LocationsTable } from "@/components/home/locationTable";

export default async function Home() {
  const session = await auth();

  if (!session) {
    // If no session exists, redirect to login
    redirect("/");
  }

  return (
    <main className="flex h-screen justify-start flex-col">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Welcome to Taskline</h1>
      </div>
      <LocationsTable user={session} />
    </main>
  );
}
