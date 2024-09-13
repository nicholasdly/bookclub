import { auth } from "@/auth";
import {
  BookMarkedIcon,
  HomeIcon,
  MessageCircleIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Footer() {
  const session = await auth();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 h-16 border-t bg-background sm:hidden">
      <nav className="flex h-full items-center justify-evenly">
        <Link
          href="/"
          className="group flex flex-col items-center justify-center gap-1 px-4 py-2"
        >
          <HomeIcon className="group-hover:stroke-3 size-6" />
          <span className="text-xs font-semibold group-hover:font-bold">
            Home
          </span>
        </Link>
        <Link
          href="/"
          className="group flex flex-col items-center justify-center gap-1 p-2"
        >
          <BookMarkedIcon className="group-hover:stroke-3 size-6" />
          <span className="text-xs font-semibold group-hover:font-bold">
            Books
          </span>
        </Link>
        <Link
          href="/"
          className="group flex flex-col items-center justify-center gap-1 p-2"
        >
          <UsersIcon className="group-hover:stroke-3 size-6" />
          <span className="text-xs font-semibold group-hover:font-bold">
            Clubs
          </span>
        </Link>
        {session && (
          <Link
            href="/"
            className="group flex flex-col items-center justify-center gap-1 p-2"
          >
            <MessageCircleIcon className="group-hover:stroke-3 size-6" />
            <span className="text-xs font-semibold group-hover:font-bold">
              Inbox
            </span>
          </Link>
        )}
        <Link
          href="/"
          className="group flex flex-col items-center justify-center gap-1 p-2"
        >
          <SearchIcon className="group-hover:stroke-3 size-6" />
          <span className="text-xs font-semibold group-hover:font-bold">
            Search
          </span>
        </Link>
      </nav>
    </footer>
  );
}
