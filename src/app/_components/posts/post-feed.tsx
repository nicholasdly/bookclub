"use client";

import { api } from "~/trpc/react";
import { Post } from "./posts";
import { LoadingSpinner } from "../loading";

export default function PostFeed() {
  const { data: posts, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="mt-3 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{posts?.map((post) => <Post {...post} key={post.id} />)}</>;
}
