import Link from "next/link";

export default function MarketingHeader() {
  return (
    <header className="mx-auto max-w-6xl border-x border-b px-10 py-3">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-serif text-2xl font-semibold">
            Bookclub
          </Link>
          <span className="text-2xl font-semibold text-muted-foreground">
            \
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
        <div className="flex items-center gap-10">
          <Link href="/auth/login" className="text-sm">
            Log In
          </Link>
          <Link href="/auth/register" className="text-sm">
            Join Bookclub
          </Link>
        </div>
      </nav>
    </header>
  );
}
