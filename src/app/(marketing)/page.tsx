import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="mt-10 grid auto-rows-min grid-cols-12 gap-x-7 lg:mt-16">
      <div className="col-span-12 mb-4 flex flex-col gap-5 lg:col-span-7 xl:col-span-5">
        <h1 className="text-5xl font-semibold tracking-tighter sm:text-center sm:text-7xl lg:text-left">
          The social platform for bookworms.
        </h1>
        <h2 className="text-2xl font-medium tracking-tight sm:text-center lg:text-left">
          Bookclub is your place to discuss, track, and review books with the
          internet.
        </h2>
        <div className="flex justify-center lg:justify-start">
          <Button
            variant="core"
            size="lg"
            className="w-full text-base font-semibold sm:w-56"
            asChild
          >
            <Link href="/auth/register">Join the club for free</Link>
          </Button>
        </div>
      </div>
      <div className="col-span-12 mt-6 lg:col-span-5 lg:self-center xl:col-span-7">
        <div className="relative mx-auto aspect-[455/311] max-w-80 sm:max-w-96 lg:max-w-[500px]">
          <Image
            src="/static/illustrations/chill-time.svg"
            alt="Chill time"
            fill
            priority
          />
        </div>
      </div>
      <div className="col-span-12 mt-1 lg:mt-8">
        {/* TODO: Add video and image, potentially in a carousel. */}
        <div className="aspect-[670/760] rounded-3xl bg-accent sm:aspect-[1280/800] sm:rounded-xl" />
      </div>
    </section>
  );
}

function ConversationSection() {
  return (
    <section className="grid auto-rows-min grid-cols-12 gap-7">
      <article className="col-span-12 mt-6 flex flex-col gap-5 sm:gap-2 lg:col-span-6 lg:mr-10">
        <h3 className="text-5xl font-semibold tracking-tighter lg:text-6xl">
          Join the conversation.
        </h3>
        <p className="text-lg font-medium tracking-tight text-muted-foreground">
          Share your thoughts, chat with friends, and join communities. Better
          yet, build your own community.
        </p>
      </article>
      <ul className="order-last col-span-12 flex flex-col gap-6 self-end sm:flex-row lg:order-none lg:col-span-6">
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">Building blocks</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              100+ content types to communicate any idea.
            </p>
          </div>
        </li>
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">Collaborative tools</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              Built for teams to share, suggest, and comment.
            </p>
          </div>
        </li>
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">AI-assisted</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              Edit, draft, translate. Ask and AI will help.
            </p>
          </div>
        </li>
      </ul>
      <div className="col-span-12">
        {/* TODO: Add video and image. */}
        <div className="aspect-[670/760] rounded-3xl bg-accent sm:aspect-[1280/800] sm:rounded-xl" />
      </div>
    </section>
  );
}

function BookSection() {
  return (
    <section className="grid auto-rows-min grid-cols-12 gap-7">
      <article className="col-span-12 mt-6 flex flex-col gap-5 sm:gap-2 lg:col-span-6 lg:mr-10">
        <h3 className="text-5xl font-semibold tracking-tighter lg:text-6xl">
          Book tracking and reviews, simplified.
        </h3>
        <p className="text-lg font-medium tracking-tight text-muted-foreground">
          Share your thoughts, chat with friends, and join communities. Better
          yet, build your own community.
        </p>
      </article>
      <ul className="order-last col-span-12 flex flex-col gap-6 self-end sm:flex-row lg:order-none lg:col-span-6">
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">Building blocks</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              100+ content types to communicate any idea.
            </p>
          </div>
        </li>
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">Collaborative tools</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              Built for teams to share, suggest, and comment.
            </p>
          </div>
        </li>
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">AI-assisted</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              Edit, draft, translate. Ask and AI will help.
            </p>
          </div>
        </li>
      </ul>
      <div className="col-span-12">
        {/* TODO: Add video and image. */}
        <div className="aspect-[670/760] rounded-3xl bg-accent sm:aspect-[1280/800] sm:rounded-xl" />
      </div>
    </section>
  );
}

function ClubSection() {
  return (
    <section className="grid auto-rows-min grid-cols-12 gap-7">
      <article className="col-span-12 mt-6 flex flex-col gap-5 sm:gap-2 lg:col-span-6 lg:mr-10">
        <h3 className="text-pretty text-5xl font-semibold tracking-tighter lg:text-6xl">
          Your clubs. Your way.
        </h3>
        <p className="text-lg font-medium tracking-tight text-muted-foreground">
          Share your thoughts, chat with friends, and join communities. Better
          yet, build your own community.
        </p>
      </article>
      <ul className="order-last col-span-12 flex flex-col gap-6 self-end sm:flex-row lg:order-none lg:col-span-6">
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">Building blocks</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              100+ content types to communicate any idea.
            </p>
          </div>
        </li>
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">Collaborative tools</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              Built for teams to share, suggest, and comment.
            </p>
          </div>
        </li>
        <li className="flex gap-3 sm:flex-col">
          <div className="relative aspect-square size-14 shrink-0 sm:size-20">
            <Image src="/static/icons/rocket.svg" alt={"Rocket"} fill />
          </div>
          <div>
            <h4 className="font-bold">AI-assisted</h4>
            <p className="font-medium leading-snug text-muted-foreground">
              Edit, draft, translate. Ask and AI will help.
            </p>
          </div>
        </li>
      </ul>
      <div className="col-span-12">
        {/* TODO: Add video and image. */}
        <div className="aspect-[670/760] rounded-3xl bg-accent sm:aspect-[1280/800] sm:rounded-xl" />
      </div>
    </section>
  );
}

export default function MarketingPage() {
  return (
    <main className="mx-auto flex max-w-screen-2xl flex-col gap-24 px-[7.5%]">
      <Hero />
      <ConversationSection />
      <BookSection />
      <ClubSection />
    </main>
  );
}
