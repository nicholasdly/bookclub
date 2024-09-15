import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from "lucide-react";

interface FormErrorProps {
  className?: string;
  message?: string;
}

export default function FormError({ className, message }: FormErrorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border border-destructive/15 bg-destructive/5 p-3 text-sm text-destructive",
        className,
      )}
    >
      <TriangleAlertIcon className="size-4" />
      <p>{message}</p>
    </div>
  );
}
