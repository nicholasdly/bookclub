import Link from "next/link";
import LogOutButton from "./auth/logout-button";
import { auth } from "@/server/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b bg-background px-3 py-2">
      <Link href="/" className="font-serif text-xl font-semibold sm:hidden">
        Bookclub
      </Link>
      <h1 className="hidden font-serif text-xl font-semibold sm:block">Home</h1>
      <div className="flex items-center gap-2 lg:hidden">
        {session ? (
          <LogOutButton />
        ) : (
          <>
            <Link
              href="/auth/login"
              className="whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="whitespace-nowrap rounded-full border bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
            >
              Join Bookclub
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
