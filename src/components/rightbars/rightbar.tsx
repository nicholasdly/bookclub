import { cn } from "@/lib/utils";

export default function Rightbar({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh w-80 shrink-0 flex-col border-x lg:flex",
        className,
      )}
    >
      {children}
    </aside>
  );
}
