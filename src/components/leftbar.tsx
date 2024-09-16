import { auth } from "@/server/auth";
import {
  BookMarkedIcon,
  HomeIcon,
  MessageCircleIcon,
  SearchIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function Leftbar() {
  const session = await auth();

  return (
    <aside className="sticky top-0 hidden h-dvh w-52 shrink-0 flex-col justify-between border-r px-5 pb-2 pt-3 sm:flex">
      <nav className="flex flex-col gap-8">
        <Link
          className="flex w-fit items-center gap-2 font-serif text-2xl font-semibold"
          href="/"
        >
          <div className="relative size-8 overflow-hidden">
            <Image src="/favicon.svg" alt={"Bookclub"} fill />
          </div>
          <span>Bookclub</span>
        </Link>
        <div className="flex flex-col gap-2">
          <Link href="/" className="group flex items-center gap-3 p-2">
            <HomeIcon className="group-hover:stroke-3 size-6" />
            <span className="font-semibold transition-transform group-hover:translate-x-1">
              Home
            </span>
          </Link>
          <Link href="/" className="group flex items-center gap-3 p-2">
            <BookMarkedIcon className="group-hover:stroke-3 size-6" />
            <span className="font-semibold transition-transform group-hover:translate-x-1">
              Books
            </span>
          </Link>
          <Link href="/" className="group flex items-center gap-3 p-2">
            <UsersIcon className="group-hover:stroke-3 size-6" />
            <span className="font-semibold transition-transform group-hover:translate-x-1">
              Clubs
            </span>
          </Link>
          <Link href="/" className="group flex items-center gap-3 p-2">
            <SearchIcon className="group-hover:stroke-3 size-6" />
            <span className="font-semibold transition-transform group-hover:translate-x-1">
              Search
            </span>
          </Link>
          {session && (
            <>
              <Link href="/" className="group flex items-center gap-3 p-2">
                <UserIcon className="group-hover:stroke-3 size-6" />
                <span className="font-semibold transition-transform group-hover:translate-x-1">
                  Profile
                </span>
              </Link>
              <Link href="/" className="group flex items-center gap-3 p-2">
                <MessageCircleIcon className="group-hover:stroke-3 size-6" />
                <span className="font-semibold transition-transform group-hover:translate-x-1">
                  Messages
                </span>
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className="text-2xs text-muted-foreground">
        <p className="font-semibold">
          <Link href="/" className="hover:text-foreground hover:underline">
            Blog
          </Link>
          &nbsp;•&nbsp;
          <Link href="/" className="hover:text-foreground hover:underline">
            Support
          </Link>
          &nbsp;•&nbsp;
          <Link href="/" className="hover:text-foreground hover:underline">
            Help
          </Link>
          &nbsp;•&nbsp;
          <Link href="/" className="hover:text-foreground hover:underline">
            T&C
          </Link>
        </p>
        <p className="font-semibold">
          <Link href="/" className="hover:text-foreground hover:underline">
            Code of Conduct
          </Link>
          &nbsp;•&nbsp;
          <Link href="/" className="hover:text-foreground hover:underline">
            Privacy
          </Link>
        </p>
        <p className="mt-2">&copy; {new Date().getFullYear()} Nicholas Ly</p>
      </div>
    </aside>
  );
}
