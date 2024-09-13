import { WaitlistForm } from "@/components/waitlist-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col items-center justify-center gap-5 p-5">
      <header className="flex flex-col items-center">
        <div className="mb-5 flex items-center gap-2">
          <div className="relative size-10 overflow-hidden">
            <Image src="/favicon.svg" alt={"Bookclub"} fill />
          </div>
          <span className="text-3xl font-semibold tracking-tight">
            Bookclub
          </span>
        </div>
        <p className="mb-2 w-full text-pretty font-medium tracking-tight">
          Bookclub is your place to discuss, track, and review books with the
          internet.
        </p>
        <p className="w-full text-pretty font-medium tracking-tight">
          Join the waitlist today to get notified when you can join.
        </p>
      </header>
      <main className="w-full">
        <WaitlistForm />
      </main>
      <footer className="text-center">
        <p className="w-full text-sm tracking-tight text-muted-foreground">
          Bookclub is currently under development.
        </p>
        <p className="w-full text-sm tracking-tight text-muted-foreground">
          Copyright © 2024 Nicholas Ly
        </p>
      </footer>
    </div>
  );
}
