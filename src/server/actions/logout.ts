"use server";

import { signOut } from "@/server/auth";
import { headers } from "next/headers";
import { ratelimits } from "@/server/ratelimit";

export async function logout() {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  // Rate limit request by IP address.
  const { success } = await ratelimits.auth.logout.limit(ip);
  if (!success) return { error: "Too many requests! Please try again later." };

  // Attempt to sign out user.
  await signOut({
    redirect: true,
    redirectTo: "/",
  });
}
