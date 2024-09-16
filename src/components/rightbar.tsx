import { auth } from "@/server/auth";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./auth/logout-button";
import { Button } from "./shadcn/button";

export default async function Rightbar() {
  const session = await auth();

  const books = [
    {
      title: "Dune Messiah",
      author: "Frank Herbert",
      page: 157,
    },
    {
      title: "Harry Potter and the Sorceror's Stone",
      author: "J.K. Rowling",
      page: 210,
    },
    {
      title: "Shogun",
      author: "Nicholas Ly",
      page: 64,
    },
    {
      title: "How I Became Famous",
      author: "Maria Ordonez",
      page: 98,
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-dvh w-80 shrink-0 flex-col border-x lg:flex">
      <div className="flex h-12 items-center justify-end gap-2 border-b px-3 py-2">
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
      <div className="p-6">
        <Link
          href="/"
          className="group mb-6 flex items-center justify-between font-semibold"
        >
          <span className="group-hover:underline">Your Books</span>
          <ArrowRightIcon className="size-7 rounded-full p-1 transition-colors group-hover:bg-zinc-200" />
        </Link>
        <ul className="space-y-5">
          {books.map((book, index) => (
            <li key={index}>
              <Link href="/" className="group flex">
                <div />
                <div>
                  <p className="text-pretty font-semibold group-hover:underline">
                    {book.title}
                  </p>
                  <p className="text-pretty text-sm">{book.author}</p>
                  <p className="text-pretty text-sm text-muted-foreground">
                    Currently reading at page {book.page}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
