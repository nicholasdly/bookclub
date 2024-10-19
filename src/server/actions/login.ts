"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import loginFormSchema from "@/lib/zod/login-form-schema";
import { ratelimits } from "@/server/ratelimit";

export async function login(body: z.infer<typeof loginFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  const { success } = await ratelimits.auth.login.limit(ip);
  if (!success) return { error: "Too many requests! Please try again later." };

  const request = await loginFormSchema.safeParseAsync(body);
  if (!request.success) return { error: "Invalid body!" };

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(request.data);

  if (error) {
    switch (error.code) {
      case "invalid_credentials":
        return { error: "Incorrect email or password!" };
      default:
        console.error({
          cause: "supabase.auth.signInWithPassword",
          code: error.code,
          message: error.message,
        });
        return { error: "Something went wrong!" };
    }
  }

  revalidatePath("/", "layout");
  redirect("/home");
}
