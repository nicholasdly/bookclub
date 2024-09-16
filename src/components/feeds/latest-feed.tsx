"use client";

import { api } from "@/trpc/react";
import Post from "../post";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { toast } from "sonner";
import Loading from "./loading";

export default function LatestFeed() {
  const [ref, entry] = useIntersectionObserver();

  const { data, isLoading, fetchNextPage, hasNextPage, isError, error } =
    api.feed.getLatest.useInfiniteQuery(
      {},
      {
        getNextPageParam: (page) => page.cursor,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    );

  const posts = data?.pages.flatMap((page) => page.posts);

  const showLoader = isLoading || hasNextPage;
  const showEnd = !showLoader && !isError;

  // Displays toast if rate limit error is thrown.
  useEffect(() => {
    if (error?.data?.code === "TOO_MANY_REQUESTS") {
      toast.error("Too many requests! Come back later.");
    }
  }, [error]);

  // Fetch the next page of posts if the last post is visible on screen.
  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  return (
    <>
      <div className="divide-y">
        {posts?.map((post, index) => (
          <Post
            key={post.id}
            ref={index === posts.length - 1 ? ref : undefined}
            {...post}
          />
        ))}
        {showLoader && <Loading />}
        {showEnd && (
          <div className="flex justify-center py-8 text-muted-foreground">
            You&apos;ve reached the end!
          </div>
        )}
        {isError && (
          <div className="flex justify-center py-8 text-muted-foreground">
            Unable to retrieve your feed!
          </div>
        )}
      </div>
    </>
  );
}
