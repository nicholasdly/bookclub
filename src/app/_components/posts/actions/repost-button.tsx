import { RepostIcon } from "../../icons";

interface RepostButtonProps {
  count: number;
}

export default function RepostButton({ count }: RepostButtonProps) {
  return (
    <button className="group flex items-center">
      <div className="rounded-full transition-colors group-hover:bg-green-200 p-1">
        <RepostIcon className="w-6 h-6 transition-colors group-hover:text-green-600" />
      </div>
      <span className="transition-colors group-hover:text-green-600">{count}</span>
    </button>
  );
}
