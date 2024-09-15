"use client";

import { api } from "@/trpc/react";
import Post from "./post";
import { LoaderCircleIcon } from "lucide-react";

function Loading() {
  return (
    <div className="mt-8 flex justify-center">
      <LoaderCircleIcon className="size-5 animate-spin" />
    </div>
  );
}

export default function Feed() {
  const { data: posts, isLoading } = api.post.getAll.useQuery();

  return (
    <div className="divide-y">
      {isLoading && <Loading />}
      {posts?.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
}
