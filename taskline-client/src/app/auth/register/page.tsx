import BackButton from "@/components/BackButton";
import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

export default async function Register() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-center bg-cover">
      <Link href="/" passHref>
        <div className="Taskline absolute top-0 left-0 bg-primary m-4 py-2 px-4 rounded-xl shadow-md">
          <p className="text-3xl text-primary-foreground">Taskline</p>
        </div>
      </Link>
      <div className="border rounded-lg shadow-md p-8 bg-background w-[22rem] relative">
        <BackButton className="absolute top-0 left-0" />
        <h2 className="text-3xl">Sign up</h2>
        <p className="text-gray-500 text-xl">Create an account</p>
        <SignUpForm />
      </div>
    </div>
  );
}
