import { auth } from "@/server/auth";
import Link from "next/link";
import LogOutButton from "../auth/logout-button";
import { Button } from "../shadcn/button";

export default async function Rightbar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const session = await auth();

  return (
    <aside className="sticky top-0 hidden h-dvh w-80 shrink-0 flex-col border-x lg:flex">
      <div className="flex h-12 items-center justify-end gap-2 border-b px-3 py-2">
        {session ? (
          <LogOutButton />
        ) : (
          <>
            <Button variant="outline" size="rounded" asChild>
              <Link href="/auth/login">Log In</Link>
            </Button>
            <Button variant="core" size="rounded" asChild>
              <Link href="/auth/register">Join Bookclub</Link>
            </Button>
          </>
        )}
      </div>
      {children}
    </aside>
  );
}
