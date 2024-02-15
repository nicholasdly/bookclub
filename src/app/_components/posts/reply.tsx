import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { PreviewItem } from "~/utils/types";
import { TrashIcon } from "../icons";
import { Avatar, AvatarImage } from "../shadcn-ui/avatar";
import Link from "next/link";

dayjs.extend(relativeTime);

interface ReplyProps {
  reply?: PreviewItem;
}

export default function Reply({ reply }: ReplyProps) {
  if (!reply)
    return (
      <div className="mx-4 mb-2 rounded-md border border-stone-400 bg-stone-200 p-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <TrashIcon className="h-6 w-6" />
          <p>This post was deleted.</p>
        </div>
      </div>
    );

  return (
    <Link
      href={`/post/${reply.id}`}
      className="mx-4 mb-2 rounded-md border border-stone-400 bg-stone-200 p-3"
    >
      <div className="flex items-center">
        <Avatar className="mr-1.5 h-6 w-6">
          <AvatarImage
            src={reply.author.imageUrl}
            alt={`${reply.author.username}'s avatar`}
          />
        </Avatar>
        <div>
          <span className="mr-2 font-semibold">{reply.author.name}</span>
          <span className="text-sm text-muted-foreground">
            {dayjs(reply.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <p className="mt-2 hyphens-auto">{reply.content}</p>
    </Link>
  );
}
