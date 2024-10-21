"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { ratelimits } from "@/server/ratelimit";

export async function logout() {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  const { success } = await ratelimits.auth.logout.limit(ip);
  if (!success) return { error: "Too many requests! Please try again later." };

  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (!error) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  console.error({
    cause: "supabase.auth.signOut",
    code: error.code,
    message: error.message,
  });

  return { error: "Something went wrong!" };
}
