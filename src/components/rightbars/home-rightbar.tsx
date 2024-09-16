import Link from "next/link";
import Rightbar from "./rightbar";
import { ArrowRightIcon } from "lucide-react";

export default function HomeRightbar() {
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
    <Rightbar>
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
    </Rightbar>
  );
}
