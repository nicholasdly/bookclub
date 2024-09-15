"use server";

import { signIn } from "@/server/auth";
import { loginFormSchema } from "@/lib/zod";
import { z } from "zod";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { AuthError } from "next-auth";

export async function login(body: z.infer<typeof loginFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.auth.login.limit(ip);
  if (!success) return { error: "Too many requests! Please try again later." };

  const fields = await loginFormSchema.safeParseAsync(body);

  if (!fields.success) {
    return { error: "Invalid body!" };
  }

  try {
    await signIn("credentials", {
      ...fields.data,
      redirect: true,
      redirectTo: "/home",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Incorrect username or password!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
