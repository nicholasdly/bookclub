import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

async function Header() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-3.5 py-3">
      <div className="flex items-center">
        <Button
          variant="link"
          size="sm"
          className="h-fit w-fit p-0 hover:no-underline"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="relative size-8 overflow-hidden">
              <Image src="/favicon.svg" alt={"Bookclub"} fill />
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              Bookclub
            </span>
          </Link>
        </Button>
      </div>
      {data.user ? (
        <Button variant="tertiary" size="sm" asChild>
          <Link href="/home">Go home</Link>
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href="/auth/login">Log in</Link>
          </Button>
          <Button variant="tertiary" size="sm" asChild>
            <Link href="/auth/register">Join the club</Link>
          </Button>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-screen-2xl border-t px-[7.5%]">
      <nav className="tablet:py-20 flex flex-col gap-9 py-10 lg:flex-row">
        <div className="flex flex-col lg:w-1/4">
          <Button
            variant="link"
            size="sm"
            className="h-fit w-fit p-0 hover:no-underline"
            asChild
          >
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative size-10 overflow-hidden">
                <Image src="/favicon.svg" alt={"Bookclub"} fill />
              </div>
              <span className="text-3xl font-semibold tracking-tight">
                Bookclub
              </span>
            </Link>
          </Button>
          <div className="mt-6 flex flex-col gap-y-4">
            <p className="text-sm">
              We do not sell or share your personal information.
            </p>
            <p className="text-sm">&copy; 2024 Nicholas Ly</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 lg:w-3/4 lg:grid-cols-4">
          <ul className="mb-8 flex flex-col">
            {/* TODO: Add links to Notion pages. */}
            <li className="font-semibold">Platform</li>
            <li className="mt-1.5">
              <Button
                variant="link"
                size="sm"
                className="h-fit p-0 text-base font-normal"
                asChild
              >
                <Link href="/">About</Link>
              </Button>
            </li>
            <li className="mt-1.5">
              <Button
                variant="link"
                size="sm"
                className="h-fit p-0 text-base font-normal"
                asChild
              >
                <Link href="/">Terms & privacy</Link>
              </Button>
            </li>
          </ul>
          <ul className="flex flex-col">
            <li className="font-semibold">Resources</li>
            <li className="mt-1.5">
              <Button
                variant="link"
                size="sm"
                className="h-fit p-0 text-base font-normal"
                asChild
              >
                <Link href="/">Changelog</Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
