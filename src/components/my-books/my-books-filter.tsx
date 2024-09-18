"use client";

import { useCallback, useState } from "react";
import { Input } from "../shadcn/input";
import { Button } from "../shadcn/button";
import Link from "next/link";
import { CircleXIcon, SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function MyBooksFilter() {
  const [title, setTitle] = useState("");

  const searchParams = useSearchParams();
  const year = searchParams.get("year") ?? new Date().getFullYear().toString();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const createFilterUrl = () => {
    let url = "/my-books";

    if (title.length > 0) {
      url += "?" + createQueryString("title", title);
    }

    return url;
  };

  const displayResetButton =
    searchParams.toString().length > 0 &&
    searchParams.toString() !== `year=${year}`;

  return (
    <div className="space-y-2">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Filter titles..."
      />
      <Button
        size="sm"
        className="w-full space-x-2"
        onClick={() => setTitle("")}
        asChild
      >
        <Link href={createFilterUrl()}>
          <SearchIcon className="size-4" />
          <span>Search</span>
        </Link>
      </Button>
      {displayResetButton && (
        <Button
          variant="outline"
          size="sm"
          className="w-full space-x-2"
          asChild
        >
          <Link href={`/my-books?year=${year}`}>
            <CircleXIcon className="size-4" />
            <span>Clear Filters</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
