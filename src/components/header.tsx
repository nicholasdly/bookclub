import Link from "next/link";
import LogOutButton from "./auth/logout-button";
import { auth } from "@/server/auth";
import { Button } from "./shadcn/button";

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
            <Button variant="outline" size="rounded" asChild>
              <Link href="/auth/login">Log In</Link>
            </Button>
            <Button variant="core" size="rounded" asChild>
              <Link href="/auth/register">Join Bookclub</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
