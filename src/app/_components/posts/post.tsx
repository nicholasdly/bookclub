"use client";

import { type RouterOutputs } from "~/trpc/shared";
import { Avatar, AvatarImage } from "../shadcn-ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Post(post: RouterOutputs["posts"]["getAll"][number]) {
  return (
    <div className="rounded-md border border-stone-400 bg-stone-100">
      <div className="m-4 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-auto w-12">
              <AvatarImage
                src={post.author.imageUrl}
                alt={`${post.author.username}'s avatar`}
              />
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold">{post.author.name}</span>
              <span className="text-sm">{dayjs(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div />
        </div>
        <p className="m-3 hyphens-auto">{post.content}</p>
      </div>
    </div>
  );
}
