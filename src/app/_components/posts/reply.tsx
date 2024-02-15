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

  if (!reply) return (
    <div className="rounded-md border border-stone-400 bg-stone-200 p-3 mx-4 mb-2">
      <div className="flex items-center text-muted-foreground gap-2">
        <TrashIcon className="w-6 h-6"/>
        <p>This post was deleted.</p>
      </div>
    </div>
  );

  return (
    <Link 
      href={`/post/${reply.id}`}
      className="rounded-md border border-stone-400 bg-stone-200 p-3 mx-4 mb-2"
    >
      <div className="flex items-center">
        <Avatar className="h-6 w-6 mr-1.5">
          <AvatarImage
            src={reply.author.imageUrl}
            alt={`${reply.author.username}'s avatar`}
          />
        </Avatar>
        <div>
          <span className="font-semibold mr-2">{reply.author.name}</span>
          <span className="text-sm text-muted-foreground">{dayjs(reply.createdAt).fromNow()}</span>
        </div>
      </div>
      <p className="hyphens-auto mt-2">{reply.content}</p>
    </Link>
  );
}
