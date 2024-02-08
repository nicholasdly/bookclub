import { api } from "~/trpc/server";
import PostFeedView from "./post-feed-view";

export const runtime = "edge";
export const preferredRegion = ["pdx1"];

interface PostFeedProps {
  userId?: string;
}

export default async function PostFeed({ userId }: PostFeedProps) {
  const data = await api.posts.getPostsAndReposts.query(
    userId ? { userId } : {}
  );

  return <PostFeedView initialData={data} userId={userId} />
}
