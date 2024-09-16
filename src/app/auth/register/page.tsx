import RegisterForm from "@/components/auth/register-form";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function RegisterPage() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-6 p-5">
      <Link className="relative size-12 overflow-hidden" href="/">
        <Image src="/favicon.svg" alt={"Bookclub"} fill />
      </Link>
      <h1 className="text-nowrap text-xl font-bold">Create an account</h1>
      <Suspense>
        <RegisterForm />
      </Suspense>
      <div className="flex gap-1 text-sm">
        <span className="text-nowrap text-muted-foreground">
          Already have an account?
        </span>
        <Link
          className="text-nowrap font-semibold hover:underline"
          href="/auth/login"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
