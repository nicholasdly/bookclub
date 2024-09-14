"use client";

import { api } from "@/trpc/react";
import Post from "./post";

export default function Feed() {
  const { data: posts } = api.post.getAll.useQuery();

  return (
    <div className="divide-y">
      {posts?.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
}
