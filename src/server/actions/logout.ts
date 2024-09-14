"use server";

import ratelimit from "@/lib/ratelimit";
import { signOut } from "@/server/auth";
import { headers } from "next/headers";

export async function logout() {
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.auth.logout.limit(ip);
  if (!success) throw new Error("TOO_MANY_REQUESTS");

  await signOut();
}
