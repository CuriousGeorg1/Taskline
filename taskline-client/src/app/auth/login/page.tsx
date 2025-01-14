import { Button } from "@/components/ui/button";
import { FaGoogle as Google } from "react-icons/fa";
import { FaGithub as Github } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { signIn, providerMap } from "@/authConfig";
import SignInForm from "@/components/SignInForm";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const callbackUrl = (await searchParams).callbackUrl;
  return (
    <div className="flex items-center justify-center w-full h-screen bg-center bg-cover">
      <Link href="/" passHref>
        <div className="Taskline absolute top-0 left-0 bg-primary m-4 py-2 px-4 rounded-xl shadow-md hover:bg-primary/90 transition-all">
          <p className="text-3xl text-primary-foreground">Taskline</p>
        </div>
      </Link>

      <div className="border rounded-lg shadow-md p-8 bg-background relative">
        <BackButton className="absolute top-0 left-0" />
        <h2 className="text-3xl">Sign in</h2>
        <p className="text-gray-500 text-xl">Sign in to access your account</p>
        <div className="flex flex-col gap-4 my-6">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                await signIn(provider.id, {
                  redirectTo: callbackUrl ?? "",
                });
              }}
            >
              <Button type="submit" className="w-full" variant="secondary">
                Sign in with {provider.name}{" "}
                <ProviderIcon provider={provider.name} />
              </Button>
            </form>
          ))}
        </div>
        <div className="flex items-center">
          <Separator className="w-[8rem]" />
          <p className="mx-2">or</p>
          <Separator className="w-[8rem]" />
        </div>
        <SignInForm />
        <p className="text-xl text-center">Need an account?</p>
        <Link href="/auth/register" passHref>
          <Button className="w-full my-6" variant="secondary">
            Create an account
          </Button>
        </Link>
      </div>
    </div>
  );
}

function ProviderIcon({ provider }: { provider: string }) {
  switch (provider) {
    case "Google":
      return <Google size={26} />;
    case "GitHub":
      return <Github size={36} />;
    default:
      return <></>;
  }
}
