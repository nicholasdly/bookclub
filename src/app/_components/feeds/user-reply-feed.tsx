"use client";

import Post from "../posts/post";
import { LoadingSpinner } from "../loading";
import { api } from "~/trpc/react";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import type { NotUndefined, PostItem } from "~/utils/types";

interface UserReplyFeedProps {
  userId: string;
}

export default function UserReplyFeed({ userId }: UserReplyFeedProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    api.users.getReplies.useInfiniteQuery(
      { userId },
      {
        getNextPageParam: (page) => page.cursor,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );

  const items = data?.pages.flatMap((page) => page.posts);

  // Helper hook for the Intersection Observer API.
  const lastRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastRef.current,
    threshold: 1,
  });

  // Fetch the next page of items if the last item is visible on screen.
  useEffect(() => {
    if (entry?.isIntersecting) void fetchNextPage();
  }, [entry, fetchNextPage]);

  if (isLoading)
    return (
      <div className="mt-3 flex justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      {items?.map((item, index) => (
        <Post
          key={item.id}
          post={item as NotUndefined<PostItem>}
          showParent={true}
          ref={index === items.length - 1 ? ref : undefined}
        />
      ))}
      {hasNextPage ? (
        <div className="mt-3 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="mt-3 flex justify-center text-muted-foreground">
          There&apos;s nothing else to load!
        </div>
      )}
    </div>
  );
}
