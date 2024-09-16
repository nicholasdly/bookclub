import Link from "next/link";
import LogOutButton from "./auth/logout-button";
import { auth } from "@/server/auth";
import { Button } from "./shadcn/button";
import Image from "next/image";

export default async function Header({
  heading,
  children,
}: {
  heading: string;
  children?: React.ReactNode;
}) {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b bg-background px-3 py-2">
      <Link
        className="flex items-center gap-1.5 font-serif text-xl font-semibold sm:hidden"
        href="/"
      >
        <div className="relative size-8 overflow-hidden sm:size-6">
          <Image src="/favicon.svg" alt={"Bookclub"} fill />
        </div>
        <span className="hidden sm:block">Bookclub</span>
      </Link>
      <h1 className="hidden font-serif text-xl font-semibold sm:block">
        {heading}
      </h1>
      {children}
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
