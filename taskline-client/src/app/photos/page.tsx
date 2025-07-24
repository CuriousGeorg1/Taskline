import { auth } from "@/authConfig";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/errors/noSession");
  }
}
