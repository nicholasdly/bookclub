import Link from "next/link";
import { BookclubLogoIcon, MobileMenuIcon } from "./icons";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import { Button } from "./shadcn-ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./shadcn-ui/sheet";

export default async function Header() {
  const user = await currentUser();

  const links = [
    {
      isPublic: false,
      text: "Home",
      href: "/home",
    },
    {
      isPublic: false,
      text: "Profile",
      href: `/${user?.username}`,
    },
  ];

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 md:py-4 lg:px-8">
        <div className="flex items-center gap-3 md:gap-16">
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MobileMenuIcon className="h-7 w-7" />
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
                <div className="mt-6 flex flex-col items-start gap-1">
                  {links.map(
                    (link, index) =>
                      (link.isPublic || user) && (
                        <SheetClose key={index} asChild>
                          <Button variant="ghost" className="text-lg" asChild>
                            <Link href={link.href}>{link.text}</Link>
                          </Button>
                        </SheetClose>
                      ),
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="hidden md:flex md:items-center md:gap-2">
            <BookclubLogoIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Bookclub</span>
          </Link>
          <div className="hidden md:flex md:gap-4">
            {links.map(
              (link, index) =>
                (link.isPublic || user) && (
                  <Button
                    key={index}
                    variant="ghost"
                    className="text-lg"
                    asChild
                  >
                    <Link href={link.href}>{link.text}</Link>
                  </Button>
                ),
            )}
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
