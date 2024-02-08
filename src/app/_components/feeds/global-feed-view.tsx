"use client";

import { Post } from "../posts/post";
import { LoadingSpinner } from "../loading";
import { type RouterOutputs } from "~/trpc/shared";
import { api } from "~/trpc/react";

interface GlobalFeedViewProps {
  initialData: RouterOutputs["posts"]["getAll"];
}

export default function GlobalFeedView({ initialData }: GlobalFeedViewProps) {
  const { data, isLoading } = api.posts.getAll.useQuery(
    undefined,
    { initialData }
  );

  if (isLoading) {
    return (
      <div className="mt-3 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-6 flex justify-center">
        <span className="text-muted-foreground">
          There&apos;s nothing here!
        </span>
      </div>
    );
  }

  return (
    <>
      {data.map((item) => (
        <Post key={item.id} post={item} />
      ))}
    </>
  );
}
