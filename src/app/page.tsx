import Link from "next/link";
import {
  BookIcon,
  BookmarkFilledIcon,
  BooksIcon,
  MessageOffIcon,
  MoodSmileBeamIcon,
  PencilIcon,
  UserCircleIcon,
} from "./_components/icons";
import { Button } from "./_components/shadcn-ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-16">
          <Link href="/" className="flex items-center gap-2">
            <BookmarkFilledIcon className="h-10 w-auto text-stone-500" />
            <span className="text-3xl font-bold">tldr</span>
          </Link>
          <div className="hidden lg:flex lg:gap-10">
            <Button variant="ghost" asChild>
              <Link href="#features">Features</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#faqs">FAQs</Link>
            </Button>
          </div>
        </div>
        <Button variant="outline" className="pointer-events-none">
          Coming soon
        </Button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 pb-32 sm:px-6 sm:py-36 sm:pb-40 lg:grid lg:grid-cols-12 lg:px-8">
      <div className="max-w-2xl lg:col-span-6 lg:max-w-none">
        <h1 className="text-4xl font-medium tracking-tight">
          The social platform for bookworms.
        </h1>
        <p className="mt-6 text-lg text-stone-600">
          <span className="font-bold">tldr</span> is a place to read, review,
          and talk about books with the internet. Keep track of the books
          you&apos;ve read, interact with other readers, and build your bookworm
          community—all in one place.
        </p>
        <Button variant="outline" className="pointer-events-none mt-6">
          Coming soon
        </Button>
      </div>
    </div>
  );
}

function Features() {
  const features = [
    {
      icon: BookIcon,
      title: "Track your reading",
      description:
        "Track every single book you're reading, have read, or plan to read in an easy to use reading log with insightful stats.",
    },
    {
      icon: PencilIcon,
      title: "Post what you want",
      description:
        "Whether its reviews, rants, or anything in between: share what you want, whenever you want, and interact with others in real time.",
    },
    {
      icon: MessageOffIcon,
      title: "280 character limit",
      description:
        "All posts—including reviews—are all character limited. We're all about keeping things short and sweet here.",
    },
    {
      icon: MoodSmileBeamIcon,
      title: "Your own personal feed",
      description:
        "Stay up to date with all the people, books, and topics you decide to follow.",
    },
    {
      icon: BooksIcon,
      title: "Link books to your posts",
      description:
        "Create posts that reference a book and page, so your followers know exactly what you're talking about.",
    },
    {
      icon: UserCircleIcon,
      title: "Personalize your profile",
      description:
        "Customize aspects of your profile to make it as personal (or generic) as you like.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-stone-900 px-4 py-20 pb-24 sm:px-6 sm:py-32 sm:pb-36 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-stone-50">
            All the features you want, with more to come.
          </h2>
          <p className="mt-2 text-lg text-stone-400">
            <span className="font-bold">tldr</span> was built for readers, and
            pulls inspiration from the best parts of other social media
            platforms such as Goodreads and Twitter to provide a performant and
            intuitive user experience.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li key={index}>
              <div className="mb-3 flex items-center gap-3">
                <feature.icon className="h-6 w-auto text-stone-300" />
                <h3 className="text-lg text-stone-300">{feature.title}</h3>
              </div>
              <p className="px-3 text-stone-400">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FAQs() {
  const faqs = [
    {
      question: "Is tldr free?",
      answer:
        "Yes! tldr in its entirety will be completely free to use, although donations will go a long way to support the team.",
    },
    {
      question: "How is tldr any different from Goodreads?",
      answer:
        "tldr's primary feature is its Twitter-like personal feed and social interactions, on top of having a beautifully intuitive book tracker. tldr has no affiliation with Amazon or any other corporation.",
    },
    {
      question: "When can I use tldr?",
      answer:
        "tldr is currently being worked on as a passion project by a one person team that already work full time, so it will be a long time before a full release. Expect beta (or even alpha) releases though!",
    },
    {
      question: "What is planned in the future?",
      answer:
        "An equally as intuitive mobile app is something the team would really like to look into in the future.",
    },
    {
      question: "Who's behind tldr?",
      answer:
        "Nicholas Ly is one and only web developer working on tldr at the moment as a passion project on the side of his full time job.",
    },
    {
      question: "Can I help work on tldr?",
      answer:
        "Currently, tldr is a private project primarily for the learning experience. As the core of tldr gets flushed out though, you can expect the website to be open sourced and open to contribution.",
    },
  ];

  return (
    <section
      id="faqs"
      className="px-4 py-20 pb-24 sm:px-6 sm:py-32 sm:pb-36 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-stone-600">
            If you have anything else you would like to ask,{" "}
            <Link
              href="mailto:nichdly@gmail.com"
              className="text-stone-800 underline"
            >
              reach out to us
            </Link>
            .
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {faqs.map(({ question, answer }, index) => (
            <li key={index}>
              <h3 className="mb-3 text-lg font-medium text-stone-800">
                {question}
              </h3>
              <p className="px-3 text-stone-600">{answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mb-8 border-t border-stone-200 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center pb-6 pt-16 lg:py-16">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <BookmarkFilledIcon className="h-12 w-auto text-stone-500" />
              <div>
                <p className="text-lg font-semibold">tldr</p>
                <p className="mt-0.5 text-sm">
                  The social platform for bookworms.
                </p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <Button variant="ghost" asChild>
                <Link href="#features">Features</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#faqs">FAQs</Link>
              </Button>
            </nav>
          </div>
        </div>
        <div className="flex justify-center border-t border-stone-200 text-sm text-stone-500">
          <p className="mt-6">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
