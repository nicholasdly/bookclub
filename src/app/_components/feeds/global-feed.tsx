import { api } from "~/trpc/server";
import GlobalFeedView from "./global-feed-view";

export const runtime = "edge";
export const preferredRegion = ["pdx1"];

export default async function GlobalFeed() {
  const data = await api.posts.getAll.query();

  return <GlobalFeedView initialData={data} />
}
