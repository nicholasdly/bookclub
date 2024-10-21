import {
  BookMarkedIcon,
  CircleUserIcon,
  HomeIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

/**
 * A basic sidebar component.
 * Most sidebars of the main application layout should use this as a base.
 */
export function Sidebar({
  side,
  className,
  children,
}: Readonly<{
  side: "left" | "right";
  className?: string;
  children: React.ReactNode;
}>) {
  const variants = {
    left: "md:flex border-r",
    right: "xl:flex border-l",
  };

  return (
    <aside
      className={cn(
        "hidden flex-col bg-sidebar text-sidebar-foreground",
        variants[side],
        className,
      )}
    >
      {children}
    </aside>
  );
}

/**
 * A left sidebar component implemented with a navigation menu.
 */
export function Navbar() {
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

  return (
    <Sidebar side="left" className="w-64 justify-between p-4">
      <nav className="flex flex-col">
        <Navlink url="/home" label="Home" icon={<HomeIcon />} />
        <Navlink url="/home" label="Books" icon={<BookMarkedIcon />} />
        <Navlink url="/home" label="Clubs" icon={<UsersIcon />} />
        <Navlink url="/home" label="Profile" icon={<CircleUserIcon />} />
        <Separator className="my-2" />
      </nav>
    </Sidebar>
  );
}
