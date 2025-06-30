import { redirect } from "next/navigation";

export default function NoSessionPage() {
  // Redirect to the login page if no session exists

  return (
    <p className="flex flex-col items-center justify-center h-screen">
      You are not logged in. Please log in to access this page.
      <br />
      <a href="/" className="text-blue-500 hover:underline">
        Go to start page
      </a>
    </p>
  );
}
