"use client";

import { api } from "~/trpc/react";
import { Post } from "./post";
import { LoadingSpinner } from "../loading";

interface FeedProps {
  userId?: string;
  type: "all" | "posts" | "replies";
}

function getPosts({ userId, type }: FeedProps) {
  switch (type) {
    case "posts":
      return api.posts.getPostsAndReposts.useQuery(userId ? { userId } : {});
    case "replies":
      return api.posts.getReplies.useQuery(userId ? { userId } : {});
    default:
      return api.posts.getAll.useQuery();
  }
}

export default function Feed({ userId, type }: FeedProps) {
  const { data, isLoading } = getPosts({ userId, type });

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
