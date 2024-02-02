import Link from "next/link";
import { BookclubLogoIcon, HamburgerMenuIcon } from "./icons";
import { SignInButton, SignedIn, SignedOut, UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "./shadcn-ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./shadcn-ui/sheet";

interface NavigationProps {
  links: {
    text: string;
    href: string;
  }[];
}

export default async function Header() {
  const user = await currentUser();

  const links = [
    {
      text: "Home",
      href: "/home",
    },
    {
      text: "Profile",
      href: `/${user!.username}`  // links only appear when user is logged in, so we can safely assert
    },
  ];

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 md:gap-16">
          <div className="block md:hidden">
            <HamburgerMenu links={links} />
          </div>
          <Link href="/" className="hidden md:flex md:items-center md:gap-2">
            <BookclubLogoIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Bookclub</span>
          </Link>
          <div className="hidden md:flex md:gap-4">
            {links.map((link, index) => (
              <Button key={index} variant="ghost" className="text-base" asChild>
                <Link href={link.href}>{link.text}</Link>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton afterSignInUrl="/home" afterSignUpUrl="/home">
                <Button variant="outline" className="w-20">
                  Sign in
                </Button>
              </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

function HamburgerMenu({ links }: NavigationProps) {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon className="w-7 h-7"/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-2">
              <BookclubLogoIcon className="h-8 w-8" />
              <span className="text-xl font-bold">Bookclub</span>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start mt-6 gap-1">
          {links.map((link, index) => (
            <SheetClose key={index} asChild>
              <Button variant="ghost" className="text-lg" asChild>
                <Link href={link.href}>{link.text}</Link>
              </Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
