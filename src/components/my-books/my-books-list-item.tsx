import { Book } from "@/app/(main)/my-books/data";
import dayjs from "dayjs";
import Rating from "../rating";
import { Button } from "../shadcn/button";
import { HeartIcon, PencilIcon } from "lucide-react";

export default function BookListItem(book: Book) {
  return (
    <li className="flex p-3">
      <div className="h-32 w-20 min-w-20 rounded-md border bg-accent" />
      <div className="ml-3 mr-10 flex flex-col">
        <p className="line-clamp-1 font-semibold">{book.title}</p>
        <p className="line-clamp-1">{book.author}</p>
        <p className="my-1 text-nowrap text-xs italic text-muted-foreground">
          {book.shelf}
        </p>
        <p className="text-nowrap text-xs">
          <span>Date Read: </span>
          <span className="text-muted-foreground">
            {book.readDate
              ? dayjs(book.readDate).format("MMMM D, YYYY")
              : "not set"}
          </span>
        </p>
        <p className="text-nowrap text-xs">
          <span>Date Started: </span>
          <span className="text-muted-foreground">
            {book.startedDate
              ? dayjs(book.startedDate).format("MMMM D, YYYY")
              : "not set"}
          </span>
        </p>
        <p className="text-nowrap text-xs">
          <span>Date Added: </span>
          <span className="text-muted-foreground">
            {dayjs(book.addedDate).format("MMMM D, YYYY")}
          </span>
        </p>
      </div>
      <div className="ml-auto flex flex-col items-end justify-between">
        <Rating rating={book.rating ?? 0} />
        <div className="space-x-1">
          <Button variant="outline" size="icon" className="group size-6">
            <HeartIcon className="size-4 group-hover:fill-red-400" />
          </Button>
          <Button variant="outline" size="icon" className="group size-6">
            <PencilIcon className="size-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
