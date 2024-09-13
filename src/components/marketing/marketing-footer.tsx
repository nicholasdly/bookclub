import Link from "next/link";

export default function MarketingFooter() {
  return (
    <footer className="group mx-auto flex max-w-6xl flex-col items-center gap-4 border-x border-t py-20">
      <p className="font-serif text-[180px]/none font-semibold opacity-15 transition-opacity duration-700 group-hover:opacity-100">
        Bookclub
      </p>
      <div className="flex gap-8 text-sm">
        <Link href="/">Blog</Link>
        <Link href="/">What&apos;s New</Link>
        <Link href="/">Careers</Link>
        <Link href="/">Help</Link>
        <Link href="/">Brand Kit</Link>
        <Link href="/">Mobile App</Link>
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <Link href="/">Code of Conduct</Link>
        <Link href="/">Privacy</Link>
        <Link href="/">Terms & Conditions</Link>
      </div>
      <div className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Nicholas Ly
      </div>
    </footer>
  );
}
