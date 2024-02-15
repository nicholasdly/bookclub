import { ReplyIcon } from "../../icons";
import Link from "next/link";

interface ReplyButtonProps {
  count: number;
  postId: string;
}

export default function ReplyButton({ count, postId }: ReplyButtonProps) {
  return (
    <Link
      href={`/post/${postId}`}
      className="group flex items-center"
    >
      <div className="rounded-full transition-colors group-hover:bg-blue-100 p-1">
        <ReplyIcon className="w-6 h-6 transition-colors group-hover:text-blue-500" />
      </div>
      <span className="transition-colors group-hover:text-blue-500">{count}</span>
    </Link>
  );
}