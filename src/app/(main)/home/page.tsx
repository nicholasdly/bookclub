import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import Page from "@/components/page";
import { Navbar, Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

function CurrentlyReading() {
  // TODO: Fetch data from database.

  const data = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      pages: 100,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      pages: 100,
    },
  ];

  return (
    <section className="rounded-md border bg-background p-5 text-foreground">
      <h3 className="mb-3 text-sm font-semibold">Currently Reading</h3>
      <ul className="space-y-3">
        {data.map((book, index) => (
          <li key={index} className="flex">
            <div className="aspect-[5/8] h-20 shrink-0 rounded-md border bg-accent" />
            <div className="ml-3 flex flex-col justify-center">
              <p className="line-clamp-1 text-ellipsis text-sm font-medium">
                {book.title}
              </p>
              <p className="line-clamp-1 text-ellipsis text-sm">
                {book.author}
              </p>
              <p className="mt-1 line-clamp-1 text-ellipsis text-xs text-muted-foreground">
                {book.pages} pages read
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WhatsNew() {
  // TODO: Fetch data from database.
  // TODO: On click, open dialog with details.

  const data = [
    {
      date: "2 days ago",
      title:
        "New PAT rotation policies preview and optional expiration for fine-grained blah blah blah",
      url: "/home",
    },
    {
      date: "3 days ago",
      title: "New Terminology for GitHub Previews",
      url: "/home",
    },
    {
      date: "4 days ago",
      title:
        "New code security configurations let you set security features at the blah blah blah blah",
      url: "/home",
    },
    {
      date: "4 days ago",
      title:
        "Actions: Runner groups now available for organizations on Free plan",
      url: "/home",
    },
  ];

  return (
    <section className="rounded-md border bg-background p-5 text-foreground">
      <h3 className="mb-3 text-sm font-semibold">What&apos;s New</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index} className="relative flex gap-3 border-l pb-3">
            <div className="absolute -left-[4.5px] top-0 size-2 rounded-full bg-border" />
            <div className="ml-4 flex flex-col">
              <p className="mb-0.5 text-xs text-muted-foreground">
                {item.date}
              </p>
              <Button
                variant="link"
                className="line-clamp-2 size-fit text-ellipsis text-wrap p-0 text-start font-medium underline-offset-1"
              >
                {item.title}
              </Button>
            </div>
          </li>
        ))}
        <li className="border-l">
          <Button
            variant="link"
            className="ml-4 size-fit gap-1 text-nowrap p-0 text-xs font-medium text-muted-foreground underline-offset-1 [&_svg]:size-3.5"
            asChild
          >
            <Link href="/home">
              View changelog <ArrowRightIcon />
            </Link>
          </Button>
        </li>
      </ul>
    </section>
  );
}

function FriendActivity() {
  // TODO: Fetch data from database.

  const data = [
    {
      name: "Nicholas Ly",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    },
    {
      name: "Nicholas Ly",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    },
    {
      name: "Nicholas Ly",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    },
  ];

  return (
    <section className="rounded-md border bg-background p-5 text-foreground">
      <h3 className="mb-3 text-sm font-semibold">Friend Activity</h3>
      <ul className="space-y-3">
        {data.map((friend, index) => (
          <li key={index} className="flex items-center">
            <div className="aspect-square size-14 shrink-0 rounded-full border bg-accent" />
            <div className="ml-3 flex flex-col justify-center">
              <p className="line-clamp-1 text-ellipsis text-sm font-medium">
                {friend.name}
              </p>
              <p className="mt-0.5 line-clamp-1 text-ellipsis text-xs">
                {friend.title}
              </p>
              <p className="line-clamp-1 text-ellipsis text-xs text-muted-foreground">
                {friend.author}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function HomePage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/auth/login");
  }

  return (
    <Page className="">
      <Navbar />
      <main className="h-[1500px]">Home Page</main>
      <Sidebar side="right" className="w-96 gap-4 p-4">
        <CurrentlyReading />
        <WhatsNew />
        <FriendActivity />
      </Sidebar>
    </Page>
  );
}
