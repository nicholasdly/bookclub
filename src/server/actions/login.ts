"use server";

import { signIn } from "@/server/auth";
import { loginFormSchema } from "@/lib/zod";
import { z } from "zod";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";

export async function login(body: z.infer<typeof loginFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.auth.login.limit(ip);
  if (!success) return { error: "Rate limit exceeded!" };

  const fields = await loginFormSchema.safeParseAsync(body);

  if (!fields.success) {
    return { error: "Invalid body!" };
  }

  await signIn("credentials", fields.data);
}
