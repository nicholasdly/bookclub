"use server";

import { hash } from "@node-rs/argon2";
import { z } from "zod";
import { eq, or } from "drizzle-orm";
import { hashingOptions } from "@/server/auth";
import { headers } from "next/headers";
import { ratelimits } from "../ratelimit";
import registerFormSchema from "@/lib/zod/register-form-schema";
import { lower } from "@/db/helpers";
import { users, verificationCodes } from "@/db/schema";
import db from "@/db";
import { redirect } from "next/navigation";
import { otp } from "@/lib/utils";
import {
  VerificationEmailTemplate,
  VerificationEmailText,
} from "@/components/emails/verification-email-template";
import resend from "../email";

export async function register(body: z.infer<typeof registerFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  // Rate limit request by IP address.
  const { success } = await ratelimits.auth.register.limit(ip);
  if (!success) return { error: "Too many requests! Please try again later." };

  // Validate request body.
  const request = registerFormSchema.safeParse(body);
  if (!request.success) return { error: "Invalid body!" };

  // Check if there exists a user with the same username or email.
  const existingUser = await db.query.users.findFirst({
    where: or(
      eq(lower(users.username), request.data.username.toLowerCase()),
      eq(lower(users.email), request.data.email.toLowerCase()),
    ),
  });

  if (existingUser && existingUser.username === request.data.username) {
    return { error: "A user already exists with that username!" };
  }

  if (existingUser && existingUser.email === request.data.email) {
    return { error: "A user already exists with that email!" };
  }

  const { user, code } = await db.transaction(async (tx) => {
    const code = otp();

    // Add user to database.
    const [user] = await tx
      .insert(users)
      .values({
        ...request.data,
        passwordHash: await hash(body.password, hashingOptions),
      })
      .returning();

    // Create verification code.
    await tx.insert(verificationCodes).values({
      code,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
    });

    return { user, code };
  });

  // Send verification code to user via email.
  await resend.emails.send({
    from: "Bookclub <hello@bookclub.social>",
    to: user.email,
    subject: "Bookclub Account Verification Code",
    react: VerificationEmailTemplate({ code }),
    text: VerificationEmailText({ code }),
  });

  // Redirect to verification page.
  redirect("/auth/verify/" + user.id);
}
