import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

import VerifyForm from "@/components/forms/verify-form";
import { createClient } from "@/lib/supabase/server";

interface VerifyPageProps {
  searchParams: { email: string };
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/home");
  }

  const { success, data: email } = z
    .string()
    .email()
    .safeParse(searchParams.email);
  if (!success) redirect("/");

  return (
    <main className="mx-auto flex h-dvh max-w-md flex-col items-center justify-center p-5">
      <Link className="relative mb-6 size-12 overflow-hidden" href="/">
        <Image src="/favicon.svg" alt={"Bookclub"} fill />
      </Link>
      <div className="mb-4 text-center">
        <h1 className="mb-2 text-nowrap text-xl font-bold">
          Verify your account
        </h1>
        <p className="text-pretty">
          Enter the verification code sent to your email.
        </p>
      </div>
      <VerifyForm email={email} />
      {/* TODO: Add a button to send a new verification code. */}
    </main>
  );
}
