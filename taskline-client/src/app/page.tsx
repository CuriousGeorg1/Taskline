import { Button } from "@/components/ui/button";
import { getCounter } from "@/services/api";
import { revalidatePath } from "next/cache";
import { inter } from "@/components/ui/fonts";
import Link from "next/link";

// export const revalidate = 0;

// export async function refetchCount() {
//   "use server";
//   revalidatePath("/");
// }

export default async function Home() {
  // const count = await getCounter();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500">
        <h1
          className={`${inter.className} text-4xl font-bold text-white pl-6 pb-2`}
        >
          Taskline
        </h1>
      </div>
      <div className="mt-4 flex grow flex-col gap-4">
        <div className="flex flex-col justify-center gap-4 rounded-lg bg-gray-100 px-6 py-10 md:w-2/5 md:px-20">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15-px] border-b-[26ox] border-l-transparent border-b-black" />
          <p className="text-2xl font-bold text-gray-800 max-w-screen-md">
            Welcome to <strong>Taskline</strong>! A simple task management tool
            for teams designed for businesses of all sizes.
          </p>
          <Link href="/login" className="flex items-center gap-2 self-auto">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
