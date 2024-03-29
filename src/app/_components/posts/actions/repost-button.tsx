import { RepostIcon } from "../../icons";

interface RepostButtonProps {
  count: number;
}

export default function RepostButton({ count }: RepostButtonProps) {
  return (
    <button className="group flex items-center">
      <div className="rounded-full p-1 transition-colors group-hover:bg-green-200">
        <RepostIcon className="h-6 w-6 transition-colors group-hover:text-green-600" />
      </div>
      <span className="transition-colors group-hover:text-green-600">
        {count}
      </span>
    </button>
  );
}
