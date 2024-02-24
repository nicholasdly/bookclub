import { type Metadata } from "next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import PostReplyFeed from "~/app/_components/feeds/post-reply-feed";
import ReplyEditor from "~/app/_components/replies/reply-editor";
import { Avatar, AvatarImage } from "~/app/_components/shadcn-ui/avatar";
import { api } from "~/trpc/server";
import { Separator } from "~/app/_components/shadcn-ui/separator";
import RepostButton from "~/app/_components/posts/actions/repost-button";
import LikeButton from "~/app/_components/posts/actions/like-button";
import { notFound } from "next/navigation";
import { getPreview } from "~/utils/data";
import Reply from "~/app/_components/posts/reply";

export const runtime = "edge";
export const preferredRegion = ["pdx1"];

dayjs.extend(relativeTime);

interface PostPageProps {
  params: { postId: string };
}

export async function generateMetadata({
  params: { postId },
}: PostPageProps): Promise<Metadata> {
  const post = await getPreview(postId);
  const title = post
    ? `${post.author.name} on Bookclub: "${post.content}"`
    : "Error 404 - Bookclub";
  return { title };
}

export default async function PostPage({ params: { postId } }: PostPageProps) {
  const post = await api.posts.get.query({ id: postId });

  if (!post) notFound();

  return (
    <main>
      <div className="mx-auto my-6 flex max-w-2xl flex-col gap-2 px-4">
        <article className="rounded-md border border-stone-400 bg-stone-100">
          <div className="mx-4 mt-4 flex flex-col">
            <div className="flex items-center gap-3">
              <Link href={`/${post.author.username}`} className="rounded-full">
                <Avatar className="h-12 w-12 hover:outline">
                  <AvatarImage
                    src={post.author.imageUrl}
                    alt={`${post.author.username}'s avatar`}
                  />
                </Avatar>
              </Link>
              <div className="flex flex-col">
                <Link
                  href={`/${post.author.username}`}
                  className="font-bold hover:underline"
                >
                  {post.author.name}
                </Link>
                <span className="text-sm text-muted-foreground">
                  @{post.author.username}
                </span>
              </div>
            </div>
            <p className="my-4 hyphens-auto text-lg">{post.content}</p>
            {post.type === "reply" && <Reply reply={post.parent} />}
            <span className="mb-4 mt-1 text-sm text-muted-foreground">
              {dayjs(post.createdAt).format("h:mm A")} ·{" "}
              {dayjs(post.createdAt).format("MMM D, YYYY")}
            </span>
            <Separator className="mb-3 bg-stone-400" />
            <div className="mb-3 flex justify-evenly">
              <RepostButton count={post.reposts} />
              <LikeButton count={post.likes} />
            </div>
          </div>
        </article>
        <ReplyEditor postId={post.id} />
        <PostReplyFeed postId={post.id} />
      </div>
    </main>
  );
}
