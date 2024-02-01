import Link from "next/link";
import { BookclubLogoIcon } from "./icons";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-16">
          <Link href="/" className="flex items-center gap-2">
            <BookclubLogoIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Bookclub</span>
          </Link>
        </div>
        <UserButton afterSignOutUrl="/" />
      </nav>
    </header>
  );
}
