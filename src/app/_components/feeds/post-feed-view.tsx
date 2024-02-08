"use client";

import { Post } from "../posts/post";
import { LoadingSpinner } from "../loading";
import { type RouterOutputs } from "~/trpc/shared";
import { api } from "~/trpc/react";

interface PostFeedViewProps {
  initialData: RouterOutputs["posts"]["getPostsAndReposts"];
  userId?: string;
}

export default function PostFeedView({ initialData, userId }: PostFeedViewProps) {
  const { data, isLoading } = api.posts.getPostsAndReposts.useQuery(
    userId ? { userId } : {},
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
