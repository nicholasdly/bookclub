import { BookOpenIcon } from "./_components/icons";
import { Button } from "./_components/shadcn-ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="w-screen h-screen flex flex-col justify-center   items-center px-10">
        <BookOpenIcon className="w-24 h-24 mb-2" />
        <h1 className="text-xl mb-4 text-center text-pretty">Looks like you turned to an empty page!</h1>
        <Button variant="outline" size="lg" className="text-base mb-8" asChild>
          <Link href="/">Go back home</Link>
        </Button>
        <span className="text-sm text-muted-foreground">Error 404</span>
      </main>
    </>
  );
}
