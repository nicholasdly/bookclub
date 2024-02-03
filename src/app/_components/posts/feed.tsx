"use client";

import { api } from "~/trpc/react";
import { Post } from "./post";
import { LoadingSpinner } from "../loading";

interface FeedProps {
  userId?: string;
  type: "global" | "posts" | "replies";
}

function getPosts({ userId, type }: FeedProps) {
  switch (type) {
    case "posts":
      return api.posts.getPosts.useQuery(userId ? { userId } : {});
    case "replies":
      return api.posts.getReplies.useQuery(userId ? { userId } : {});
    default:
      return api.posts.getAll.useQuery();
  }
}

export default function Feed(props: FeedProps) {
  const { data, isLoading } = getPosts(props);

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
      {data.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}
