"use client";

import Link from "next/link";
import { Button } from "../shadcn/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function MyBooksYear() {
  const searchParams = useSearchParams();

  const yearParameter = searchParams.get("year");
  const year = yearParameter
    ? parseInt(yearParameter, 10)
    : new Date().getFullYear();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex justify-between border-b">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-none border-r"
        asChild
      >
        <Link
          href={"/my-books?" + createQueryString("year", (year - 1).toString())}
        >
          <ChevronLeftIcon className="size-4" />
        </Link>
      </Button>
      <div className="inline-flex size-8 items-center justify-center whitespace-nowrap">
        <span className="font-serif font-semibold">{year}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-none border-l"
        asChild
      >
        <Link
          href={"/my-books?" + createQueryString("year", (year + 1).toString())}
        >
          <ChevronRightIcon className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
