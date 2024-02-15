import { Avatar, AvatarImage } from "../shadcn-ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import PostControls from "./post-controls";
import { useUser } from "@clerk/nextjs";
import { type ForwardedRef, forwardRef } from "react";
import type { NotUndefined, PostItem } from "~/utils/types";
import ReplyButton from "./actions/reply-button";
import RepostButton from "./actions/repost-button";
import LikeButton from "./actions/like-button";
import Reply from "./reply";

dayjs.extend(relativeTime);

interface PostProps {
  post: NotUndefined<PostItem>;
  showParent: boolean;
}

export default forwardRef(function Post(
  { post, showParent }: PostProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const { user } = useUser();

  return (
    <article
      className="rounded-md border border-stone-400 bg-stone-100"
      ref={ref}
    >
      <div className="mx-4 mt-4 flex flex-col">
        <div className="mb-3 flex justify-between">
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
                {dayjs(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div>
            {user?.username === post.author.username && (
              <PostControls postId={post.id} />
            )}
          </div>
        </div>
        <p className="mb-3 hyphens-auto">{post.content}</p>
        {showParent && post.type === "reply" && <Reply reply={post.parent} />}
        <div className="mb-3 flex justify-evenly">
          <ReplyButton count={post.replies} postId={post.id} />
          <RepostButton count={post.reposts} />
          <LikeButton count={post.likes} />
        </div>
      </div>
    </article>
  );
});
