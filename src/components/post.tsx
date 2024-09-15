import { cn, formatNumber } from "@/lib/utils";
import {
  BookmarkIcon,
  EllipsisVerticalIcon,
  MessageCircleIcon,
  Repeat2Icon,
  ThumbsUpIcon,
} from "lucide-react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { RouterOutputs } from "@/trpc/react";

dayjs.extend(relativeTime);

export default function Post(post: RouterOutputs["post"]["getAll"][number]) {
  return (
    <article className="flex flex-col gap-4 p-4 hover:bg-muted">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-12 overflow-hidden rounded-full">
            <Image
              src={post.author.image}
              alt={`Profile picture of ${post.author.username}`}
              fill
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{post.author.name}</span>
            <div className="text-sm font-medium text-muted-foreground">
              <span>@{post.author.username}</span>
              &nbsp;•&nbsp;
              <span>{dayjs(post.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
        <button className="mr-2 rounded-full p-1 transition-colors hover:bg-zinc-200">
          <EllipsisVerticalIcon className="size-4" />
        </button>
      </div>
      <p className="whitespace-pre-line">{post.content}</p>
      <div className="flex items-center justify-evenly">
        <button className="group flex items-center rounded-full">
          <div className="rounded-full p-2 transition-colors group-hover:bg-blue-100">
            <ThumbsUpIcon
              className={cn(
                "size-5 transition-colors group-hover:stroke-blue-500",
                false && "fill-blue-500 group-hover:stroke-current",
              )}
            />
          </div>
          <span
            className={cn(
              "pr-2 text-sm font-semibold transition-colors group-hover:text-blue-500",
              false && "text-blue-500",
            )}
          >
            {formatNumber(0)}
          </span>
        </button>
        <button className="group flex items-center rounded-full">
          <div className="rounded-full p-2 transition-colors group-hover:bg-green-100">
            <MessageCircleIcon className="size-5 transition-colors group-hover:stroke-green-500" />
          </div>
          <span className="pr-2 text-sm font-semibold transition-colors group-hover:text-green-500">
            {formatNumber(0)}
          </span>
        </button>
        <button className="group flex items-center rounded-full">
          <div className="rounded-full p-2 transition-colors group-hover:bg-orange-100">
            <Repeat2Icon
              className={cn(
                "size-5 transition-colors group-hover:stroke-orange-500",
                false && "fill-orange-500 group-hover:stroke-current",
              )}
            />
          </div>
          <span
            className={cn(
              "pr-2 text-sm font-semibold transition-colors group-hover:text-orange-500",
              false && "text-orange-500",
            )}
          >
            {formatNumber(0)}
          </span>
        </button>
        <button className="group flex items-center rounded-full">
          <div className="rounded-full p-2 transition-colors group-hover:bg-red-100">
            <BookmarkIcon
              className={cn(
                "size-5 transition-colors group-hover:stroke-red-500",
                false && "fill-red-500 group-hover:stroke-current",
              )}
            />
          </div>
          <span
            className={cn(
              "pr-2 text-sm font-semibold transition-colors group-hover:text-red-500",
              false && "text-red-500",
            )}
          >
            {formatNumber(0)}
          </span>
        </button>
      </div>
    </article>
  );
}
