import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex h-screen justify-start flex-col">
      <Header />
      <div className="w-full h-[20rem] mt-16 overflow-hidden">
        <Image
          src="/office.jpg"
          alt="Productive office"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <h1 className="bg-primary text-primary-foreground w-full text-4xl px-48 py-6 shadow-md">
        Streamline your planning workflows with Taskline
      </h1>
      <div className="px-48 my-8">
        <p className="text-2xl max-w-[40rem]">
          Welcome to <strong>Taskline</strong>! A simple task management tool
          for teams designed for businesses of all sizes.
        </p>
        <Link href="/auth/login" passHref>
          <Button className="text-lg my-8">Get started</Button>
        </Link>
      </div>
    </main>
  );
}
