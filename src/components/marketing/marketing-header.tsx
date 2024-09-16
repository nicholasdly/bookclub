import Link from "next/link";
import Image from "next/image";
import { Button } from "../shadcn/button";

export default function MarketingHeader() {
  return (
    <header className="mx-auto max-w-6xl border-x border-b px-10 py-3">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            className="flex items-center gap-2 font-serif text-2xl font-semibold"
            href="/"
          >
            <div className="relative size-8 overflow-hidden">
              <Image src="/favicon.svg" alt={"Bookclub"} fill />
            </div>
            <span>Bookclub</span>
          </Link>
          <span className="text-2xl font-semibold text-muted-foreground">
            /
          </span>
          <Link href="/" className="text-sm">
            Individuals
          </Link>
          <Link href="/" className="text-sm">
            Friends
          </Link>
          <Link href="/" className="text-sm">
            Organizations
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="rounded" asChild>
            <Link href="/auth/login" className="text-sm">
              Log In
            </Link>
          </Button>
          <Button variant="core" size="rounded" asChild>
            <Link href="/auth/register" className="text-sm">
              Join Bookclub
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
