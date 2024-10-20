import RegisterForm from "@/components/forms/register-form";
import { auth } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/home");

  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-6 p-5">
      <Link className="relative size-12 overflow-hidden" href="/">
        <Image src="/favicon.svg" alt={"Bookclub"} fill />
      </Link>
      <h1 className="text-nowrap text-xl font-bold">Create an account</h1>
      <RegisterForm />
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
