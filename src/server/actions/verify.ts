"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import db from "@/db";
import { profiles } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import verifyFormSchema from "@/lib/zod/verify-form-schema";
import { ratelimits } from "@/server/ratelimit";

export async function verify(body: z.infer<typeof verifyFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  const { success } = await ratelimits.auth.login.limit(ip);
  if (!success) return { error: "Too many requests! Please try again later." };

  const request = await verifyFormSchema.safeParseAsync(body);
  if (!request.success) return { error: "Invalid body!" };

  const supabase = createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email: request.data.email,
    token: request.data.token,
    type: "email",
  });

  if (error) {
    switch (error.code) {
      case "otp_expired":
        return { error: "That code has expired or is invalid!" };
      default:
        console.error({
          cause: "supabase.auth.verifyOtp",
          code: error.code,
          message: error.message,
        });
        return { error: "Something went wrong!" };
    }
  }

  await db.transaction(async (tx) => {
    await tx.insert(profiles).values({
      id: data.user!.id,
      username: data.user!.user_metadata.username,
      name: data.user!.user_metadata.display_name,
    });
  });

  revalidatePath("/", "layout");
  redirect("/home");
}
