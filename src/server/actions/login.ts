"use server";

import { signIn } from "@/server/auth";
import { z } from "zod";
import { headers } from "next/headers";
import { ratelimits } from "@/server/ratelimit";
import { AuthError } from "next-auth";
import loginFormSchema from "@/lib/zod/login-form-schema";

export async function login(body: z.infer<typeof loginFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  // Rate limit request by IP address.
  const { success } = await ratelimits.auth.login.limit(ip);
  if (!success) return { error: "Too many requests! Please try again later." };

  // Validate request body.
  const request = await loginFormSchema.safeParseAsync(body);
  if (!request.success) return { error: "Invalid body!" };

  // Attempt to sign in user.
  try {
    await signIn("credentials", {
      ...request.data,
      redirect: true,
      redirectTo: "/home",
    });
  } catch (error) {
    // Handle authentication errors.
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Incorrect username or password!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    // Next.js redirects (and therefore Auth.js redirects) work by throwing an
    // error. To maintain this functionality, we need to throw the caught
    // error.
    throw error;
  }
}
