"use client"

import { api } from "~/trpc/react";
import Post from "./post";
import { LoadingSpinner } from "../loading";

export default function PostFeed() {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-3">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {data!.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </>
  );
}
