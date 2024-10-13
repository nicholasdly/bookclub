import LoginForm from "@/components/forms/login-form";
import { auth } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/home");

  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-6 p-5">
      <Link className="relative size-12 overflow-hidden" href="/">
        <Image src="/favicon.svg" alt={"Bookclub"} fill />
      </Link>
      <h1 className="text-nowrap text-xl font-bold">Sign in to your account</h1>
      <LoginForm />
      <div className="flex gap-1 text-sm">
        <span className="text-nowrap text-muted-foreground">
          Don&apos;t have an account?
        </span>
        <Link
          className="text-nowrap font-semibold hover:underline"
          href="/auth/register"
        >
          Sign up
        </Link>
      </div>
    </main>
  );
}
