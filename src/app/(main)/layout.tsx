import {
  BookMarkedIcon,
  CircleUserIcon,
  HomeIcon,
  InboxIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import UserButton from "@/components/user-button";
import { createClient } from "@/lib/supabase/server";

async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <header className="fixed inset-x-0 top-0 z-10 h-[60px] border-b bg-sidebar p-3">
      <div className="flex items-center justify-between">
        <section className="flex items-center gap-2.5">
          <div className="relative size-8 overflow-hidden">
            <Image src="/favicon.svg" alt={"Bookclub"} fill />
          </div>
          <h1 className="text-lg font-semibold">Bookclub</h1>
        </section>
        {data.user ? (
          <section className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <PlusIcon />
            </Button>
            <Button variant="outline" size="icon" className="mr-1">
              <InboxIcon />
            </Button>
            <UserButton user={data.user} />
          </section>
        ) : (
          <section className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button variant="tertiary" size="sm">
              Sign up
            </Button>
          </section>
        )}
      </div>
    </header>
  );
}

function Footer() {
  const Navlink = ({
    url,
    label,
    icon,
  }: Readonly<{ url: string; label: string; icon: React.ReactNode }>) => (
    <Button
      variant="ghost"
      className="z-10 size-full flex-col gap-1 rounded-none p-0 [&_svg]:size-6"
      asChild
    >
      <Link href={url}>
        {icon}
        <span className="text-nowrap text-xs font-semibold">{label}</span>
      </Link>
    </Button>
  );

  return (
    <footer className="fixed inset-x-0 bottom-0 block h-[60px] border-t bg-sidebar md:hidden">
      <nav className="flex h-full justify-evenly">
        <Navlink url="/home" label="Home" icon={<HomeIcon />} />
        <Navlink url="/home" label="Books" icon={<BookMarkedIcon />} />
        <Navlink url="/home" label="Clubs" icon={<UsersIcon />} />
        <Navlink url="/home" label="Profile" icon={<CircleUserIcon />} />
      </nav>
    </footer>
  );
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
