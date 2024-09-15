"use server";

import ratelimit from "@/lib/ratelimit";
import { signOut } from "@/server/auth";
import { headers } from "next/headers";

export async function logout() {
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.auth.logout.limit(ip);
  if (!success) throw new Error("Too many requests! Please try again later.");

  await signOut({
    redirect: true,
    redirectTo: "/",
  });
}
