import { Avatar, AvatarImage } from "../shadcn-ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import PostActions from "./post-actions";
import { useUser } from "@clerk/nextjs";
import { type ForwardedRef, forwardRef } from "react";
import { type PostItem } from "~/utils/types";

dayjs.extend(relativeTime);

interface PostProps {
  post: PostItem;
}

export default forwardRef(function Post({ post }: PostProps, ref: ForwardedRef<HTMLDivElement>) {
  const { user } = useUser();

  return (
    <div className="rounded-md border border-stone-400 bg-stone-100" ref={ref}>
      <div className="m-4 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${post.author.username}`}>
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={post.author.imageUrl}
                  alt={`${post.author.username}'s avatar`}
                />
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <span className="font-bold">{post.author.name}</span>
              <span className="text-sm">{dayjs(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div>
            {user?.username === post.author.username && (
              <PostActions postId={post.id} />
            )}
          </div>
        </div>
        <p className="m-3 hyphens-auto">{post.content}</p>
      </div>
    </div>
  );
});
