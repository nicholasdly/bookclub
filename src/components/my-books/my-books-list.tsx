"use client";

import { books } from "@/app/(main)/my-books/data";
import BookListItem from "./my-books-list-item";
import { useSearchParams } from "next/navigation";

export default function MyBooksList() {
  const searchParams = useSearchParams();

  const year = searchParams.get("year") ?? new Date().getFullYear().toString();
  const title = searchParams.get("title");

  const filteredBooks = books.filter((book) => {
    const readYear = book.readDate?.getFullYear().toString();
    const startedYear = book.startedDate?.getFullYear().toString();
    const addedYear = book.addedDate.getFullYear().toString();

    if (readYear && readYear !== year) {
      return false;
    } else if (startedYear && startedYear !== year) {
      return false;
    } else if (addedYear && addedYear !== year) {
      return false;
    }

    if (title && !book.title.toLowerCase().includes(title)) {
      return false;
    }

    return true;
  });

  return (
    <ul className="divide-y">
      {filteredBooks.map((book, index) => (
        <BookListItem key={index} {...book} />
      ))}
    </ul>
  );
}
