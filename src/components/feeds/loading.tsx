import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center py-8">
      <LoaderCircleIcon className="size-5 animate-spin" />
    </div>
  );
}
