import { cn } from "@/lib/utils";

/**
 * A base page component.
 * Most pages of the main application layout should use this as a base.
 */
export default function Page({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "flex min-h-svh py-[60px] sm:pb-0 [&_main]:grow [&_main]:bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
}
