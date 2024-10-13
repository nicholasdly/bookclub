import { auth } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import VerifyForm from "@/components/forms/verify-form";
import { z } from "zod";
import ResendButton from "./resend-button";

interface VerifyPageProps {
  params: { userId: string };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const session = await auth();
  if (session?.user) redirect("/home");

  const { success, data: userId } = z.string().uuid().safeParse(params.userId);
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
      <VerifyForm userId={userId} />
      <ResendButton userId={userId} />
    </main>
  );
}
