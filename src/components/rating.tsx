import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const style = "size-5";

export default function Rating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={cn("flex", className)}>
      {[...Array(5)].map((_, index) =>
        index + 1 <= rating ? (
          <StarIcon key={index} className={cn(style, "fill-amber-300")} />
        ) : (
          <StarIcon key={index} className={cn(style, "fill-accent")} />
        ),
      )}
    </div>
  );
}
