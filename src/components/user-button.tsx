"use client";

import {
  BookMarkedIcon,
  BookOpenIcon,
  ConstructionIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

import { logout } from "@/server/actions/logout";
import { User } from "@supabase/supabase-js";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

function UserMenu({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();

  const signout = () => {
    startTransition(() => {
      logout()
        .then((response) => response?.error && toast.error(response.error))
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const Navlink = ({
    url,
    label,
    icon,
  }: Readonly<{ url: string; label: string; icon: React.ReactNode }>) => (
    <Button
      variant="ghost"
      className="h-fit justify-start p-1.5 hover:bg-neutral-200"
      asChild
    >
      <Link href={url}>
        {icon} {label}
      </Link>
    </Button>
  );

  const Sublink = ({
    url,
    label,
  }: Readonly<{ url: string; label: string }>) => (
    <Button
      variant="link"
      className="h-fit w-fit p-0 text-xs underline-offset-1"
      asChild
    >
      <Link href={url}>{label}</Link>
    </Button>
  );

  return (
    <div className="flex h-full w-full flex-col">
      <section className="mb-2 flex items-center gap-2">
        <div className="relative aspect-square h-full overflow-hidden rounded-full border">
          <Image
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.username}
            fill
          />
        </div>
        <p className="flex flex-col">
          <span className="text-nowrap text-sm font-semibold">
            {user.user_metadata.username}
          </span>
          <span className="text-nowrap text-sm text-muted-foreground">
            {user.user_metadata.display_name}
          </span>
        </p>
      </section>
      <Separator className="my-2" />
      <nav className="flex flex-col">
        <Navlink url="/home" label="Your Profile" icon={<UserIcon />} />
        <Navlink url="/home" label="Your Books" icon={<BookMarkedIcon />} />
        <Navlink url="/home" label="Your Clubs" icon={<UsersIcon />} />
        <Separator className="my-2" />
        <Navlink url="/home" label="Settings" icon={<SettingsIcon />} />
        <Separator className="my-2" />
        <Navlink url="/home" label="Bookclub Docs" icon={<BookOpenIcon />} />
        <Navlink
          url="/home"
          label="Bookclub Roadmap"
          icon={<ConstructionIcon />}
        />
        <Navlink url="/home" label="Bookclub Support" icon={<UsersIcon />} />
      </nav>
      <Separator className="my-2" />
      <Button
        variant="ghost"
        className="h-fit justify-start p-1.5 hover:bg-neutral-200"
        disabled={isPending}
        onClick={() => signout()}
      >
        <LogOutIcon /> Sign out
      </Button>
      <section className="mt-auto">
        <p className="text-xs font-medium text-muted-foreground">
          &copy; {new Date().getFullYear()} Nicholas Ly
        </p>
        <div className="mb-1.5 mt-3 flex flex-col">
          <Sublink url="/" label="Terms and Conditions" />
          <Sublink url="/" label="Privacy Policy" />
          <Sublink url="/" label="Code of Conduct" />
        </div>
        <Button
          variant="link"
          className="h-fit p-0 text-xs text-muted-foreground underline-offset-1"
        >
          Cookie settings
        </Button>
        <p className="text-xs font-medium">
          We do not sell or share your personal information.
        </p>
      </section>
    </div>
  );
}

export default function UserButton({ user }: { user: User }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative size-8 overflow-hidden rounded-full ring-primary"
        >
          <Image
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.username}
            fill
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 rounded-md border-l bg-sidebar p-4 text-sidebar-foreground">
        <UserMenu user={user} />
      </SheetContent>
    </Sheet>
  );
}
