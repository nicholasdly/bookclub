import { BookOpenIcon } from "./_components/icons";
import { Button } from "./_components/shadcn-ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center   justify-center px-10">
        <BookOpenIcon className="mb-2 h-24 w-24" />
        <h1 className="mb-4 text-pretty text-center text-xl">
          Looks like you turned to an empty page!
        </h1>
        <Button variant="outline" size="lg" className="mb-8 text-base" asChild>
          <Link href="/">Go back home</Link>
        </Button>
        <span className="text-sm text-muted-foreground">Error 404</span>
      </main>
    </>
  );
}
