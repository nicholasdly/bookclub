"use client"

import { type RouterOutputs } from "~/trpc/shared";
import { Avatar, AvatarImage } from "./shadcn-ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Post(post: RouterOutputs["posts"]["getAll"][number]) {
  return (
    <div className="bg-stone-100 border border-stone-400 rounded-md">
      <div className="flex flex-col gap-3 m-4">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <Avatar className="w-12 h-auto">
              <AvatarImage src={post.author.imageUrl} alt={`${post.author.username}'s avatar`} />
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold">{post.author.name}</span>
              <span className="text-sm">{dayjs(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div />
        </div>
        <p className="m-3">{post.content}</p>
      </div>
    </div>
  );
}