import { LikeIcon } from "../../icons";

interface LikeButtonProps {
  count: number;
}

export default function LikeButton({ count }: LikeButtonProps) {
  return (
    <button className="group flex items-center">
      <div className="rounded-full p-1 transition-colors group-hover:bg-red-100">
        <LikeIcon className="h-6 w-6 transition-colors group-hover:text-red-500" />
      </div>
      <span className="transition-colors group-hover:text-red-500">
        {count}
      </span>
    </button>
  );
}
