import { Button } from "@/components/ui/button";
import { getCounter } from "@/services/api";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export async function refetchCount() {
  "use server";
  revalidatePath("/");
}

export default async function Home() {
  const count = await getCounter();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <form action={refetchCount}>
        <Button type="submit">Increase count: {count}</Button>
      </form>
    </main>
  );
}
