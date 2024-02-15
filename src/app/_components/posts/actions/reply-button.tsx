import { ReplyIcon } from "../../icons";
import Link from "next/link";

interface ReplyButtonProps {
  count: number;
  postId: string;
}

export default function ReplyButton({ count, postId }: ReplyButtonProps) {
  return (
    <Link href={`/post/${postId}`} className="group flex items-center">
      <div className="rounded-full p-1 transition-colors group-hover:bg-blue-100">
        <ReplyIcon className="h-6 w-6 transition-colors group-hover:text-blue-500" />
      </div>
      <span className="transition-colors group-hover:text-blue-500">
        {count}
      </span>
    </Link>
  );
}
